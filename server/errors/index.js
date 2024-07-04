const BadRequestError = require("./badRequest");
const CustomAPIError = require("./customApi");
const NotFoundError = require("./notFound");
const UnauthenticatedError = require("./unauthenticateError")
module.exports = {
  BadRequestError,
  NotFoundError,
UnauthenticatedError,
  CustomAPIError
};
