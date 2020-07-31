const Joi = require("@hapi/joi");

const registerValidator = Joi.object({
  username: Joi.string().min(1).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { registerValidator, loginValidator };
