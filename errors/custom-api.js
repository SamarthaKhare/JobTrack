/* Its a class that extends/is a child class of Error class in express thus super is used it handles the errors 
and help us to return custom message inplace of INTERNAL_SERVER_ERROR when their is a Bad-Request or Not-Found err */
class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = CustomAPIError
