const express = require("express");
const router = express.Router();

const { 
    registerJobSeekerController, 
    jobSeekerLoginController
} = require("../controllers/jobSeekersController");


// router.post("/registerJobSeeker", registerJobSeekerController);
// router.post("/logInJobSeeker", jobSeekerLoginController);



module.exports = router
