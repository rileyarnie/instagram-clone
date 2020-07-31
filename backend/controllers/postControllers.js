const { postValidator } = require("../validators/postValidator");
const Post = require("../models/post");
const createError = require("http-errors");
const { cloudinary } = require("../utils/cloudinary");

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
    const post = new Post({
      imageUrl: cloudImage.secure_url,
      caption,
    });
    const savedPost = await post.save();
    if (!savedPost) {
      throw createError.InternalServerError(
        "Post creation failed. Please try again."
      );
    }

    res.status(201).json({ post: savedPost });
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};

// DELETE POST

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findOneAndDelete(id);
    if (!deletedPost) {
      throw next(createError.NotFound("Post not found"));
    }

    res.status(200).send("Successfully deleted post");
  } catch (error) {
    return next(error);
  }
};

// UPDATE POST
