const express = require("express");
/**************************************** */
const transactionController = require("../controller/transaction-controllers");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/transaction", transactionController.getTransactions);
/**************************************** */
router.post(
  "/transactionFrom",
  validator.fromValidator(),
  transactionController.getTransactionByFromAddress
);
router.post(
  "/transactionTo",
  validator.toValidator(),
  transactionController.getTransactionByToAddress
);
/**************************************** */
router.post(
  "/transfer",
  [
    validator.fromValidator(),
    validator.toValidator(),
    validator.amountValidator(),
  ],
  transactionController.transfer
);
/**************************************** */
module.exports = router;
/**************************************** */
