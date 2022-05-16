const mongoose = require("mongoose");
/**************************************** */
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profilePicture: { type: String },
    gender: { type: String, required: true, enum: ["male", "female"] },
  },
  {
    timestamps: true,
  }
);
/**************************************** */
module.exports = mongoose.model("User", userSchema);
/**************************************** */
