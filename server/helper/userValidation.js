const Joi = require("joi");

const userValidation = Joi.object({
  // FirstName: Joi.string().min(2).required(),
  // LastName: Joi.string().min(3).required(),
  FullName: Joi.string().min(3).required(),
  Email: Joi.string().email().required().email(),
  // Phone: Joi.string().min(10).max(11).required(),
  Password: Joi.string().min(5).max(12).required(),
  // UserType: Joi.string(),
});

module.exports = userValidation;
