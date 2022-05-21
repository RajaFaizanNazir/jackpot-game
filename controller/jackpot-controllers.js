const HttpError = require("../util/http-error");
const validator = require("../middleware/validate");
const { ethers } = require("ethers");
require("dotenv").config();
const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`
);
const Jackpot_ABI = require("../abi/jackpot.json");
const ERC20_ABI = require("../abi/gameTrainCoin.json");
const jackpotAddress = process.env.JACKPOT_ADDRESS;
/**************************************** */
const getParticipants = async (req, res, next) => {
  let contract;
  let wallet;
  try {
    contract = new ethers.Contract(jackpotAddress, Jackpot_ABI, provider);
    wallet = new ethers.Wallet(privateKey, provider);
  } catch (err) {
    const error = new HttpError(
      "Failed to connect to wallet, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ contract: contract, wallet: wallet });
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
  getParticipants,
  participate,
  win,
};
/**************************************** */
