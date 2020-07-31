const createError = require("http-errors");
const User = require("../models/user");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const validatedUser = await registerValidator.validateAsync(req.body);
    if (!validatedUser) {
      throw createError.BadRequest("please enter correct data ");
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      throw createError.Conflict("username unavailable");
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw createError.Conflict("email already in use");
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const access_token = await jwt.sign(
      { id: savedUser._id, username: savedUser.username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30m",
      }
    );
    res.status(201).json(access_token);
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};
// LOGIN
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const validatedUser = await loginValidator.validateAsync(req.body);
    if (!validatedUser) {
      throw createError.BadRequest("Please fill all fields");
    }
    const user = await User.findOne({ username });
    if (!user) {
      throw createError.NotFound("User doesn't exist");
    }
    const validPassword = await bcrpyt.compare(password, user.password);
    if (!validPassword) {
      throw createError.BadRequest("enter valid password");
    }

    access_token = await jwt.sign(
      { id: user._id, username: username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30m",
      }
    );

    res.status(200).json(access_token);
  } catch (error) {
    error.isJoi ? (error.status = "400") : "";
    return next(error);
  }
};
// LOGOUT
exports.logout = (req, res, next) => {
  res.send("logout");
};
