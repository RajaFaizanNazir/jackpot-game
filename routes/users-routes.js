const express = require("express");
/**************************************** */
const usersController = require("../controller/users-controllers");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.post(
  "/register",
  [
    validator.firstNameValidator(),
    validator.lastNameValidator(),
    validator.profilePictureValidator(),
    validator.walletAddressValidator(),
  ],
  usersController.register
);
/**************************************** */
router.post(
  "/login",
  validator.walletAddressValidator(),
  usersController.login
);
/**************************************** */
router.get("/users", usersController.getUsers);
/**************************************** */
router.post(
  "/UserByWalletAddress",
  validator.walletAddressValidator(),
  usersController.getUsersByWalletAddress
);
/**************************************** */
module.exports = router;
/**************************************** */
