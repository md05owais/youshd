const express = require("express");
const router = express();
const { validateToken } = require("../Auth/validate.Token");
const {
  createUserAccount,
  getAllUser,
  findUser,
} = require("../controller/Registration/registration_controller");
const {
  generate_otp,
  validateOtp,
  resetPassword,
} = require("../controller/forgotPassword/index");

const { Login } = require("../controller/login/login");
router.post("/Register", createUserAccount);
router.post("/login", Login);
router.get("/:email", validateToken, findUser);
router.post("/sendotp", generate_otp);
router.post("/validateotp", validateOtp);
router.post("/resetpassword", resetPassword);

module.exports = router;
