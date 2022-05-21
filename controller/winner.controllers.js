const HttpError = require("../util/http-error");
const Winner = require("../model/winner");
const validator = require("../middleware/validate");
/**************************************** */
const getWinners = async (req, res, next) => {
  let winners;
  try {
    winners = await Winner.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ winners: winners });
};
/**************************************** */
const getWinnerByWalletAddress = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { walletAddress } = req.body;
  let existingWinner;
  try {
    existingWinner = await Winner.find({ walletAddress: walletAddress });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingWinner) {
    const error = new HttpError("Invalid Wallet Address, Not found.", 403);
    return next(error);
  }
  res.json(existingWinner);
};
/**************************************** */
const win = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { walletAddress, amount } = req.body;

  const createdWinner = new Winner({
    walletAddress,
    amount,
  });

  try {
    await createdWinner.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed while saving, please try again later" + err,
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdWinner.id,
    walletAddress: createdWinner.walletAddress,
  });
};
/**************************************** */
module.exports = {
  getWinnerByWalletAddress,
  getWinners,
  win,
};
/**************************************** */
