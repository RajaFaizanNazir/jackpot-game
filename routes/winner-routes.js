const express = require("express");
/**************************************** */
const winnerController = require("../controller/winner-controllers");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/winners", winnerController.getWinners);
router.post(
  "/winnerByWalletAddress",
  validator.walletAddressValidator(),
  winnerController.getWinnerByWalletAddress
);
/**************************************** */
router.post(
  "/win",
  [validator.walletAddressValidator(), validator.amountValidator()],
  winnerController.win
);
/**************************************** */
module.exports = router;
/**************************************** */
