const { genSalt, hashSync } = require("bcrypt");

const userSchema = require("../../models/Registration");
const { findUserByEmail } = require("../services/findUserByEmail");

const resetPassword = async (req, res) => {
  const { Email, Password } = req.body;
  //   console.log(Email, Password);
  let findUser = await findUserByEmail(Email);
  console.log(findUser.iat);
  try {
    const salt = await genSalt(10);
    console.log(salt);
    const hashPassword = hashSync(Password, salt);
    console.log(hashPassword);
    findUser.Password = hashPassword;
    let newDetails = new userSchema(findUser);

    newDetails = await newDetails.updateOne({ Password: hashPassword });
    console.log(newDetails);
    return res.status(201).json({
      status: 201,
      success: true,
      message: "Password Reset successfully",
    });
  } catch (err) {
    return res.status(501).json({
      status: 501,
      success: false,
      message: "please try again!",
    });
  }
};

module.exports = { resetPassword };
