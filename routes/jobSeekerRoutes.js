const express = require("express");
const router = express.Router();

const { 
    registerJobSeekerController, 
    jobSeekerLoginController
} = require("../controllers/jobSeekersController");

const {
  jobSeekerRegisterValidator,
  jobSeekerLogInValidator
} = require("../validators/jobSeekerValidator");

const {
     generateToken,
     verifyToken
    } = require("../middleware/authMiddleware")


router.post("/registerJobSeeker",jobSeekerRegisterValidator, generateToken, registerJobSeekerController);
router.post("/logInJobSeeker",jobSeekerLogInValidator, verifyToken, jobSeekerLoginController);



module.exports = router
