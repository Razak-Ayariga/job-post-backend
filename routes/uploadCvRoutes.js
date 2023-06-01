import express from "express";
const router = express.Router();

import uploadCvController from "../controllers/uploadCvController.js";
// import jobSeekerInfoValidator from "../Validators/uploadCvValidator.js";
import uploadCvMiddleware from "../middlewares/cvUploadMiddleware.js";
import { verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

router.put("/uploadCv",
    // jobSeekerInfoValidator,
    verifyJobseekerToken,
    uploadCvMiddleware("public/cvs").single("cv"),
    uploadCvController);

export default router;