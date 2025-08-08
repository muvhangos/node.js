"use strict";

// Importing HTTP status codes module
const httpStatus = require("http-status-codes");

// Middleware for logging errors
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};

// Handler for 404 - Resource Not Found
exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

// Handler for 500 - Internal Server Error
exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
