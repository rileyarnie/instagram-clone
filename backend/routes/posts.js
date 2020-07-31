const express = require("express");
const multer = require("multer");
const createError = require("http-errors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(createError.BadRequest("Chosen filetype not supported"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter,
});

const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("", postsController.getPosts);
router.post(
  "/create-post",
  upload.single("imageUrl"),
  postsController.createPost
);

router.delete("/delete-post/:id", postsController.deletePost);

module.exports = router;
