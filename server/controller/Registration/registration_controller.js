const express = require("express");
const userSchema = require("../../models/Registration");
const userValidation = require("../../helper/userValidation");
const { validateName } = require("../../helper/nameValidation");
const { hashSync, genSaltSync } = require("bcrypt");
const { findUserByEmail } = require("../services/findUserByEmail");

const createUserAccount = async (req, res) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
    return;
  }
  // let validateFirstName = validateName(req.body.FirstName);
  // if (!validateFirstName) {
  //   return res.status(401).json({
  //     status: 401,
  //     success: false,
  //     message: "First Name contain only English alphabet",
  //   });
  // }
  let validateFullName = validateName(req.body.FullName);
  if (!validateFullName) {
    return res.status(401).json({
      status: 401,
      success: true,
      message: "Last Name contain only English alphabet",
    });
  }
  try {
    const salt = genSaltSync(10);
    const hashPass = hashSync(req.body.Password, salt);
    req.body.Password = hashPass;
    let user = new userSchema(req.body);
    user = await user.save();
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "somethings went wrong...",
      });
    }
    res.status(201).send(user);
    return;
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
    return;
  }
};

const getAllUser = async (req, res) => {
  // res.send("owais");
  const user = await userSchema.find();
  if (!user) {
    return res.status(500).json({ success: false });
  }
  res.status(200).send(user);
  return;
};

const findUser = async (req, res) => {
  const Email = req.params.email;
  const user = await findUserByEmail(Email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User Not Found",
    });
  }
  return res.status(201).json({
    success: true,
    message: user,
  });
};
module.exports = { createUserAccount, getAllUser, findUser };
