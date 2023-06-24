// import moongoose package that already installed since its not inbuit like express (we do npm i mongoose)
const mongoose = require('mongoose');
const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
