const { required } = require("@hapi/joi");

const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if (!req.get("Authorization")) {
    throw createError.Unauthorized();
  }
  const token = req.get("Authorization").split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, paylod) => {
    if (err) {
      const message =
        err.message === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    (req.userId = paylod.id), (req.username = paylod.username);
    next();
  });
};

module.exports = isAuthenticated