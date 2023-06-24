/*
Before visting the paths for patch,delete,create we will check if user is a TestUser or not if so we throw err
This is checked via TestUser Middleware since its a middleware put before controller first it will run and if no err
the call will go to the next *which is the controller.
*/
const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} = require('../controllers/jobs');

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

module.exports = router;
