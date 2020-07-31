const createError = require("http-errors");
const User = require("../models/user");
const { registerValidator } = require("../validators/userValidator");
const bcrpyt = require("bcryptjs");

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

    res.status(201).json({ user: { username, email } });
  } catch (error) {
    error.isJoi ? (error.status = 400) : "";
    return next(error);
  }
};
// LOGIN
exports.login = (req, res, next) => {
  res.send("login");
};
// LOGOUT
exports.logout = (req, res, next) => {
  res.send("logout");
};
