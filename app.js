/**************************************** */
const fs = require("fs");
process.env.PORT = 5000;
/**************************************** */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
/**************************************** */
const usersRoutes = require("./routes/users-routes");
const transactionRoutes = require("./routes/transactions-routes");
const HttpError = require("./util/http-error");
/**************************************** */
const app = express();
/**************************************** */
app.use(bodyParser.json());
/**************************************** */
app.use("/api/user", usersRoutes);
app.use("/api/transaction/", transactionRoutes);
/**************************************** */
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
/**************************************** */
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
/**************************************** */
mongoose
  .connect(
    "mongodb+srv://faizan:123@bootcamp.apuj8.mongodb.net/FinalProject?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is up port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to cloud" + err);
  });
/**************************************** */
