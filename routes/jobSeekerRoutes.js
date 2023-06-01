import express from"express";
const router = express.Router();

import { registerJobSeekerController, jobSeekerLoginController, getJobSeekerController, updateJobSeekerInfo} from "../controllers/jobSeekersController.js";
import { jobSeekerRegisterValidator, jobSeekerLogInValidator} from "../validators/jobseekerValidator.js"
import { jobseekerSignUpToken, jobseekerLogInToken, verifyJobseekerToken,uploadPhotoMiddleware } from "../middlewares/jobseekerAuthMiddleware.js";


router.post("/registerJobSeeker",
   uploadPhotoMiddleware("").none(),
    jobSeekerRegisterValidator,
    jobseekerSignUpToken,
    registerJobSeekerController);

router.post("/logInJobSeeker",
    uploadPhotoMiddleware("").none(),
    jobSeekerLogInValidator,
    jobseekerLogInToken,
    verifyJobseekerToken,
    jobSeekerLoginController);

router.get("/getInfo",
    verifyJobseekerToken,
    getJobSeekerController);

router.put("/updateJobSeeker",
    uploadPhotoMiddleware("public/uploads").single("photo"),
    verifyJobseekerToken,
    updateJobSeekerInfo);

export default router;
