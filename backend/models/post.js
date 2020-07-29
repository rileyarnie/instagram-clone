const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema({
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
