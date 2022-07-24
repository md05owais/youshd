const nodemailer = require("nodemailer");

const send_otp_toUser = async (data) => {
  const { Email, otp } = data;
  console.log(Email, otp);
  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "md05owais@outlook.com",
      pass: "owaisgi8816@",
    },
  });

  const text = `Hi user,
Did you forget your password?
You can recover it with the OTP below
${otp}`;
  const options = {
    from: "md05owais@outlook.com",
    to: `${Email}`,
    subject: "password Recovery",
    text: text,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    }
    console.log("sent:" + info);
  });
};

module.exports = { send_otp_toUser };
