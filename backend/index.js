require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())
app.use("", (req, res, next) => {
  res.send("Hello");
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
