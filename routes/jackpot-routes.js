const express = require("express");
const validator = require("../middleware/validate");
/**************************************** */
const jackpotController = require("../controller/jackpot-controllers");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/participants", jackpotController.getParticipants);
router.get("/win", jackpotController.win);
/**************************************** */
router.post(
  "/participate",
  [validator.walletAddressValidator(), validator.amountValidator()],
  jackpotController.participate
);
/**************************************** */
module.exports = router;
/**************************************** */
