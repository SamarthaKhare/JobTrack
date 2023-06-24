const { BadRequestError } = require('../errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Test User. Read Only'); // instead of passing err to next middleware like next(err) 
    // and check for err,here the express catches the err and stops futher the req made
  }
  next();
};

module.exports = testUser;
