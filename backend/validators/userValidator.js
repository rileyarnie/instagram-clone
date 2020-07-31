const Joi = require("@hapi/joi");

const userValidator = Joi.object({
  username: Joi.string().min(1).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { userValidator };
