const { body, validationResult } = require("express-validator");
/**************************************** */
const firstNameValidator = () => {
  return [body("firstName").exists()];
};
/**************************************** */
const lastNameValidator = () => {
  return [body("lastName").exists()];
};
/**************************************** */
const profilePictureValidator = () => {
  return [body("profilePicture").exists().isString()];
};
/**************************************** */
const walletAddressValidator = () => {
  return [body("walletAddress").exists()];
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
  body,
  validationResult,
  firstNameValidator,
  lastNameValidator,
  profilePictureValidator,
  walletAddressValidator,
  fromValidator,
  toValidator,
  amountValidator,
};
/**************************************** */
