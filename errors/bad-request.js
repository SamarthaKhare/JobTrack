const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');
// when we want to throw this err we pass the message which is used by class constructor, and the prop status code is also set
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
