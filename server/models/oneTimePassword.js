const express = require("express");
const mongoose = require("mongoose");

const otpDetails = mongoose.Schema({
  Email: {
    type: String,
    allowNull: false,
  },
  otp: {
    type: Number,
    allowNull: false,
  },
});

module.exports = mongoose.model("otpDetails", otpDetails);
