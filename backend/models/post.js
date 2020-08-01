const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postValidator = new schema({
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments:[{
    type: schema.Types.ObjectId,
    ref: "Comment"
  }]
}); 

module.exports = mongoose.model("Post", postValidator);
