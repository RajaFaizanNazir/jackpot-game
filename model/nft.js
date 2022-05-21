const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftSchema = new Schema({
  description: { type: String, required: true },
  external_url: { type: String },
  image: { type: String },
  name: { type: String, required: true },
  attributes: [{ type: String }],
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("NFT", nftSchema);
