const express = require("express");
/**************************************** */
const nftController = require("../controller/nft-controllers");
const multer = require("../middleware/multer");
/**************************************** */
const router = express.Router();
/**************************************** */
router.post("/upload", multer.upload.single("image"), nftController.uploadNft);
/**************************************** */
module.exports = router;
