const express = require("express");
const userSchema = require("../../models/Registration");

const findUserByEmail = async (Email) => {
  const result = await userSchema.findOne({ Email: Email });
  const user = await result;
  if (!user) {
    return false;
  }
  return user;
};

module.exports = { findUserByEmail };
