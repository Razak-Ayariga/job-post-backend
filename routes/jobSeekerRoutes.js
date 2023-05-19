const express = require("express");
const router = express.Router();

const { registerJobSeekerController, jobSeekerLoginController} = require("../controllers/jobSeekersController");
const { jobSeekerRegisterValidator, jobSeekerLogInValidator} = require("../Validators/jobSeekerValidator")
const { jobseekerToken, verifyJobseekerToken } = require("../middlewares/jobseekerAuthMiddleware");

<<<<<<< .merge_file_T1QSfm
const {
  jobSeekerRegisterValidator,
  jobSeekerLogInValidator
  } = require("../validators/jobseekerValidator");

const {
     generateToken,
     verifyToken
    } = require("../middlewares/jobseekerAuthMiddleware");
const { jobseekerToken, verifyJobseekerToken } = require("../middlewares/jobseekerAuthMiddleware");


=======

>>>>>>> .merge_file_ycZYII
router.post("/registerJobSeeker",jobSeekerRegisterValidator, jobseekerToken, registerJobSeekerController);
router.post("/logInJobSeeker",jobSeekerLogInValidator, verifyJobseekerToken, jobSeekerLoginController);



module.exports = router
