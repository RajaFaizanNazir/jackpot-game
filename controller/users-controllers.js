const HttpError = require("../util/http-error");
const User = require("../model/user");
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
const getUsersByWalletAddress = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { walletAddress } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ walletAddress: walletAddress });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Invalid Wallet Address, Not found.", 403);
    return next(error);
  }
  res.json(existingUser);
};
/**************************************** */
const register = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, profilePicture, walletAddress } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ walletAddress: walletAddress });
  } catch (err) {
    const error = new HttpError(
      "Registering up failed, please try again later." + err,
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User with same wallet address exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    profilePicture,
    walletAddress,
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

  res
    .status(201)
    .json({ userId: createdUser.id, walletAddress: createdUser.walletAddress });
};
/**************************************** */
const login = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { walletAddress } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ walletAddress: walletAddress });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later." + err,
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid Wallet Address, could not log you in.",
      403
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.walletAddress,
  });
};
/**************************************** */
module.exports = {
  register,
  login,
  getUsers,
  getUsersByWalletAddress,
};
/**************************************** */
