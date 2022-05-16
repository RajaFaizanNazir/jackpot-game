const bcrypt = require("bcrypt");
const saltRounds = 12;
/**************************************** */
const encrypt = (password) => {
  return bcrypt.hashSync(password, saltRounds, function (err, hash) {});
};
/**************************************** */
const isSame = (password, hash) => {
  return bcrypt.compareSync(password, hash, function (err, result) {});
};
/**************************************** */
module.exports = { encrypt, isSame };
/**************************************** */