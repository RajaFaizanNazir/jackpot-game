const mongoose = require("mongoose");
/**************************************** */
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String, required: true },
    walletAddress: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("User", userSchema);
/**************************************** */
