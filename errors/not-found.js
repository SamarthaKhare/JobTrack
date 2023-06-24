const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');
// This class extend from our CustomAPIError the message we get as a parameter for constructor and then 
// we set the appropriate status code
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
