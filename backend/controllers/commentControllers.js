const Comment = require("../models/comment");
const { commentValidator } = require("../validators/commentValidator");
const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

exports.createComment = async (req, res, next) => {
  const { content } = req.body;

  try {
    const validatedComment = await commentValidator.validateAsync({ content });
    console.log("********", validatedComment);

    if (!validatedComment) {
      throw createError.BadRequest("Please fill all fields");
    }
    const user = await User.findById(req.userId);
    if (!user) {
      throw createError.NotFound("User not found!");
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      throw createError.NotFound("Post not found");
    }
    const comment = new Comment({
      content,
      author: req.userId,
    });

    const commentsInDb = await Comment.find();

    if (commentsInDb.length < 1) {
      user.comments.push(comment);
      post.comments.push(comment);
      await user.save();
      await post.save();
      await comment.save();

    } else {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      user.comments.push(comment);
      post.comments.push(comment);
      await user.save({ session: sess });
      await post.save({ session: sess });
      await comment.save({ session: sess });
    }

    res.status(200).json(comment);
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};
