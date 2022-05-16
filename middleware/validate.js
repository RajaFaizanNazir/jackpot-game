const { body, validationResult } = require("express-validator");
/**************************************** */
const credentialsValidator = () => {
  return [
    body("username").exists(),
    body("password").exists().isLength({ min: 5 }),
  ];
};
/**************************************** */
const usernameValidator = () => {
  return [body("username").exists()];
};
/**************************************** */
const passwordValidator = () => {
  return [body("password").exists().isLength({ min: 5 })];
};
/**************************************** */
const nameValidator = () => {
  return [body("name").exists().isString()];
};
/**************************************** */
const genderValidator = () => {
  return [body("gender").exists().isString().isIn(["male", "female"])];
};
/**************************************** */
const profilePictureValidator = () => {
  return [body("profilePicture").exists().isString()];
};
/**************************************** */
const fromValidator = () => {
  return [body("from").exists()];
};
/**************************************** */
const toValidator = () => {
  return [body("to").exists()];
};
/**************************************** */
const amountValidator = () => {
  return [body("amount").exists()];
};
/**************************************** */
module.exports = {
  credentialsValidator,
  usernameValidator,
  body,
  validationResult,
  nameValidator,
  genderValidator,
  profilePictureValidator,
  passwordValidator,
  fromValidator,
  toValidator,
  amountValidator,
};
/**************************************** */
