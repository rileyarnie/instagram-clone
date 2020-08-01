const { postValidator } = require("../validators/postValidator");
const Post = require("../models/post");
const createError = require("http-errors");
const { cloudinary } = require("../utils/cloudinary");
const User = require("../models/user");
const mongoose = require("mongoose");

// GET ALL POSTS
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      throw createError.InternalServerError(
        "Something went wrong. No worrie, just try again."
      );
    }

    res.status(200).json({ posts });
  } catch (error) {
    return next(
      createError.InternalServerError("Something went wrong. Please try again")
    );
  }
};

// CREATE POST
exports.createPost = async (req, res, next) => {
  const { caption } = req.body;

  try {
    if (!req.file) {
      throw createError.BadRequest("Please enter a valid image");
    }
    const imageUrl = req.file.path;
    const validatedPost = await postValidator.validateAsync({
      caption,
      imageUrl,
    });
    if (!validatedPost) {
      throw createError.BadRequest();
    }

    const cloudImage = await cloudinary.uploader.upload(
      imageUrl,
      (error, result) => {
        if (error) {
          throw createError.InternalServerError();
        }
      }
    );
    const creator = await User.findById(req.userId);
    if (!creator) {
      throw createError.Unauthorized("Please login then try again.");
    }

    const post = new Post({
      imageUrl: cloudImage.secure_url,
      caption,
      creator,
    });
    const sess = await mongoose.startSession();
    sess.startTransaction();
    creator.posts.push(post);
    await creator.save({ session: sess });
    await post.save({ session: sess });
    await sess.commitTransaction();

    res.status(201).json({ post });
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};

// DELETE POST

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("creator");
    if (!post) {
      throw next(createError.NotFound("Post not found"));
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    await post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();

    res.status(200).send("Successfully deleted post");
  } catch (error) {
    return next(error);
  }
};

// UPDATE POST
