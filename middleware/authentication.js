/*
  Its a middleware first authenticate the user by checking the token recevied as we make req (this is stored in     local storage when the user registers or login) against the JWT_Secret using jwt.verfiy.

  The req has header(which is a obj and contains a key "authorization" whose val is a string "Bearer ..Token..") we obtain the token of user from it upon verification we get payload and as designed it has name of user,id of user who made the req since that token is uniquely created for user and have info of his name,id (as payload)

  If verfied we stick a obj named user in req that has UserId and isTestUser(this helps to identify if requested for a Demo)   
*/

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    const testUser = payload.userId === '64808f82add24762c3133260'; // For Demo App 
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid'); // if fake token 
  }
};

module.exports = auth;
