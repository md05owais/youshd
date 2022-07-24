const { verify } = require("jsonwebtoken");
const { secretKey } = require("../helper/secret.key");
const validateToken = async (req, res, next) => {
  let token = req.get("Authorization");
  if (!token) {
    return res.status(403).json({
      success: 0,
      message: "UnAuthorized",
    });
  }
  token = token.slice(7);
  const user = verify(token, secretKey, (err, decoded) => {
    console.log(decoded.data.Password);
    if (err) {
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }
    next();
  });
};

module.exports = { validateToken };
