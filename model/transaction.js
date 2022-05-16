const mongoose = require("mongoose");
/**************************************** */
const Transaction = mongoose.Schema;
/**************************************** */
const transactionSchema = new Transaction(
  {
    from: { type: String },
    to: { type: String },
    amount: { type: Number },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("Transaction", transactionSchema);
/**************************************** */
