const Joi = require("@hapi/joi");

const commentValidator = Joi.object({
  content: Joi.string().min(0).max(100).required(),
});

module.exports = { commentValidator };
