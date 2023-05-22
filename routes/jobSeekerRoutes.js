import express from"express";
const router = express.Router();

import { registerJobSeekerController, jobSeekerLoginController} from "../controllers/jobSeekersController.js";
import { jobSeekerRegisterValidator, jobSeekerLogInValidator} from "../Validators/jobSeekerValidator.js";
import { jobseekerToken, verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

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



export default router;
