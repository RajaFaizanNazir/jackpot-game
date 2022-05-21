const HttpError = require("../util/http-error");
const validator = require("../middleware/validate");
/**************************************** */
const getParticipants = async (req, res, next) => {
  res.json({ winners: "API COMING SOON" });
};
/**************************************** */
const participate = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { walletAddress, amount } = req.body;
  res.json("API COMING SOON");
};
/**************************************** */
const win = async (req, res, next) => {
  res.status(404).json({
    walletAddress: "API COMING SOON",
  });
};
/**************************************** */
module.exports = {
  getWinnerByWalletAddress,
  getWinners,
  win,
};
/**************************************** */
