import express from"express";
const router = express.Router();

import { registerJobSeekerController, jobSeekerLoginController} from "../controllers/jobSeekersController.js";
import { jobSeekerRegisterValidator, jobSeekerLogInValidator} from "../Validators/jobSeekerValidator.js";
import { jobseekerToken, verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

router.post("/registerJobSeeker",jobSeekerRegisterValidator, jobseekerToken, registerJobSeekerController);
router.post("/logInJobSeeker",jobSeekerLogInValidator, verifyJobseekerToken, jobSeekerLoginController);



export default router;
