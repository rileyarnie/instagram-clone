require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");

const app = express();
const postRoutes = require("./routes/posts");

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/", postRoutes);

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
    app.listen(PORT, console.log("app listening on port 5000"));
  })
  .catch((err) => {
    createError.InternalServerError(), console.log(err);
  });
