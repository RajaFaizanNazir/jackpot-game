const mongoose = require("mongoose");
/**************************************** */
const Transaction = mongoose.Schema;
/**************************************** */
const transactionSchema = new Transaction(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("Transaction", transactionSchema);
/**************************************** */
