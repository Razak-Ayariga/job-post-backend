import express from"express";
const router = express.Router();

import { registerJobSeekerController, jobSeekerLoginController} from "../controllers/jobSeekersController.js";
import { jobSeekerRegisterValidator, jobSeekerLogInValidator} from "../validators/jobseekerValidator.js"
import { jobseekerSignUpToken, jobseekerLogInToken, verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

router.post("/registerJobSeeker",jobSeekerRegisterValidator, jobseekerSignUpToken, registerJobSeekerController);
router.post("/logInJobSeeker",jobSeekerLogInValidator,jobseekerLogInToken, verifyJobseekerToken, jobSeekerLoginController);

export default router;
