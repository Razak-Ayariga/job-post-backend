import express from "express";
const router = express.Router();

import jobSeekerInfoController from "../controllers/jobSeekerInfoController.js";
import jobSeekerInfoValidator from "../Validators/jobSeekerInfoValidator.js";
import uploadCvMiddleware from "../middlewares/jobSeekerInfoMiddleware.js";
import { verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

router.put("/personalInfo", jobSeekerInfoValidator,
    verifyJobseekerToken,
    uploadCvMiddleware("public/cvs").single("cv"),
    jobSeekerInfoController);

export default router;