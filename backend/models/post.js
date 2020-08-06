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
  creator: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
