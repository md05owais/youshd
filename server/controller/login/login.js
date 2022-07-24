const { sign } = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const { findUserByEmail } = require("../services/findUserByEmail");
// const fs = require("fs");
// require("dotenv").config();
// const secretKey = process.env.SEC_KEY;

const { secretKey } = require("../../helper/secret.key");
const Login = async (req, res) => {
  const { Email, Password } = req.body;

  const data = await findUserByEmail(Email);
  if (!data) {
    res.status(400).json({
      status: 400,
      success: false,
      message: "Invalid Email",
    });
    return;
  }

  const checkPassword = compareSync(Password, data.Password);
  if (!checkPassword) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "password is Incorrect",
    });
  }

  data.Password = undefined;
  const token = sign({ data: data }, secretKey, {
    expiresIn: "1h",
  });

  return res.status(201).json({
    status: 201,
    success: true,
    message: "Successfully Login!",
    token: token,
  });
};

module.exports = { Login };
