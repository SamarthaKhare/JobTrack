/*
Apart from errors like NOTFOUND,BadReq we dont want all other err to just be thrown as Internal Server Err(501) but we want specific err, the err is basically an obj  which have various keys like name,code etc.
With help of these we can handle errors more specifically like for wrong query but route is correct we throw validation err or when already registered user to regiter with same id again  
*/

const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default err
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }
  // IN case of register if dont provide any val but also checked in frontend and model itself
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
    console.log(err)
  }
  if (err.code && err.code === 11000) {
    // like this its produced code: 11000,keyValue: { email: 'testUser@test.com' } keys of err.keyValue as its mongoose obj we do Object. to access them
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
    console.log(err)
  }
  if (err.name === 'CastError') {
    // for search query 
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }
  // else return the default internal service err
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
