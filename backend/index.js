require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");

const app = express();
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const isAuthenticated = require("./middlewares/isAuth");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/auth", authRoutes);
app.use("/posts", isAuthenticated, postRoutes);
app.use("/comments", isAuthenticated, commentRoutes);

//MIDDLEWARES
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({ error: error.message });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("Connected to database ");
    app.listen(PORT, console.log(`app listening on port ${PORT}`));
  })
  .catch((err) => {
    createError.InternalServerError(), console.log(err);
  });
