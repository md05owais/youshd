const express = require("express");
const oneTimePassword = require("../../models/oneTimePassword");
const validateOtp = async (req, res, next) => {
  const { Email, otp } = req.body;
  // console.log(Email);
  const findUser = await oneTimePassword.findOne({ Email: Email });
  console.log(findUser);
  console.log(Email, otp, findUser.otp);
  if (findUser.otp == otp) {
    return res.status(201).json({
      status: 201,
      success: true,
      message: "otp varified successfully",
      Email: Email,
    });
  } else {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Invalid otp",
    });
  }
};
module.exports = { validateOtp };
