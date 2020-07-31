const Joi = require("@hapi/joi");

const postValidator = Joi.object({
  imageUrl: Joi.string().required(),
  caption: Joi.string(),
});

module.exports = { postValidator };
