// It populate the db with mock data having creater Id=Test user Id in db thus we have to run it --> node populate 
require('dotenv').config();
const mockData = require('./mock-data.json');
const Job = require('./models/Job');
const connectDB = require('./db/connect');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockData);
    console.log('Success !!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
