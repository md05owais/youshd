const { generate_otp } = require("./otp_generator");
const { validateOtp } = require("./validate_otp");
const { resetPassword } = require("./reset_password");

module.exports = { generate_otp, validateOtp, resetPassword };
