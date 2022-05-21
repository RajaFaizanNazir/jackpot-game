const mongoose = require("mongoose");
/**************************************** */
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    walletAddress: { type: String, required: true },
    amount: { type: String },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("Winners", userSchema);
/**************************************** */
