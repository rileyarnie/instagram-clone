const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema({
    content: {
    type: String,
    required: true,
  },
  author: {
    type: schema.Types.ObjectId,
    required: true,
    ref:"User"
  },
});

module.exports = mongoose.model("Comment", commentSchema);
