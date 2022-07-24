const express = require("express");
const { findUserByEmail } = require("../services/findUserByEmail");
const otpDetails = require("../../models/oneTimePassword");
const { send_otp_toUser } = require("./send_otp_to_user");
const generate_otp = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await findUserByEmail(Email);
    if (!user) {
      return res.status(402).json({
        status: 402,
        success: false,
        message: "Email id dose not exist",
      });
    }
    const otp = Math.round(Math.random() * 1000000) + 1;
    const data = await send_otp_toUser({ Email, otp });
    // console.log("owais");
    const userInOtpTable = await otpDetails.findOne({ Email: Email });

    if (userInOtpTable) {
      const newOtp = otp;
      userInOtpTable.otp = newOtp;
      const newDetails = new otpDetails(userInOtpTable);
      const responce = await newDetails.updateOne({ otp: newOtp });
      if (responce) {
        return res.status(201).json({
          status: 201,
          success: true,
          message: "otp send to your Email",
          Email: Email,
          otp: otp,
        });
      }
      return res.status(501).json({
        status: 501,
        success: false,
        message: "Try Once Again",
      });
    }
    const result = {
      Email: Email,
      otp: otp,
    };
    let otpSave = new otpDetails(result);
    otpSave = await otpSave.save();
    if (otpSave) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "otp send to your Email",
        Email: Email,
        otp: otp,
      });
    }
  } catch (err) {
    return res.status(501).json({
      status: 501,
      success: false,
      message: "Try again",
    });
  }
};

module.exports = { generate_otp };
