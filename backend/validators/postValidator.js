const Joi = require("@hapi/joi");

const postSchema = Joi.object({
  imageUrl: Joi.string().required(),
  caption: Joi.string(),
});

module.exports = { postSchema };
