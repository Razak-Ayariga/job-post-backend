import express from "express";
const router = express.Router();

import addEducationController from "../controllers/educationController.js";
import { verifyJobseekerToken, uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";
import educationValidator from "../Validators/educationValidators.js";

router.post("/addEducation",
    uploadPhotoMiddleware("").none(),
    verifyJobseekerToken,
    educationValidator,
    addEducationController);

export default router;