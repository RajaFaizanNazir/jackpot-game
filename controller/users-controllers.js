const HttpError = require("../util/http-error");
const User = require("../model/user");
const confidential = require("../middleware/confidential");
const validator = require("../middleware/validate");
/**************************************** */
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ users: users });
};
/**************************************** */
const getUsersByUsername = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Invalid Email, Not found.", 403);
    return next(error);
  }
  res.json(existingUser);
};
/**************************************** */
const signup = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, username, password, gender, profilePicture } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later." + err,
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = confidential.encrypt(password);
  } catch (err) {
    const error = new HttpError(
      "Error Encrypting Password, please try again." + err,
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    username,
    password: hashedPassword,
    gender,
    profilePicture,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed while saving, please try again later" + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.username });
};
/**************************************** */
const login = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later." + err,
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = confidential.isSame(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again." +
        err,
      500
    );
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  res.json({
    userId: existingUser.id,
    email: existingUser.username,
  });
};
/**************************************** */
const updatePassword = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = confidential.encrypt(password);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again." + err,
      500
    );
    return next(error);
  }
  existingUser.password = hashedPassword;
  existingUser.save(function (err) {
    if (err) {
      console.error("ERROR UPDATING DOCUMENT:" + err);
    }
  });
  res.status(201).json({ username: existingUser.username });
};
/**************************************** */
module.exports = {
  signup,
  login,
  updatePassword,
  getUsers,
  getUsersByUsername,
};
/**************************************** */
