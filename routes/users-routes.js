const express = require("express");
/**************************************** */
const usersController = require("../controller/users-controllers");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.post(
  "/signup",
  [
    validator.credentialsValidator(),
    validator.nameValidator(),
    validator.profilePictureValidator(),
    validator.genderValidator(),
  ],
  usersController.signup
);
/**************************************** */
router.post("/login", validator.credentialsValidator(), usersController.login);
/**************************************** */
router.post(
  "/updatePassword",
  validator.credentialsValidator(),
  usersController.updatePassword
);
/**************************************** */
router.get("/users", usersController.getUsers);
/**************************************** */
router.post(
  "/UserByUsername",
  validator.usernameValidator(),
  usersController.getUsersByUsername
);
/**************************************** */
module.exports = router;
/**************************************** */
