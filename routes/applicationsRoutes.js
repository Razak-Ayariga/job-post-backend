import express from "express";
const router = express.Router();

import jobApplication from "../controllers/applicationsController.js";
import { applicationCv, applicationLetter } from "../middleware/applicationsMiddleware.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";


router.post("/jobApp",verifyJobseekerToken, applicationCv("applications/cvs").single("cv"), jobApplication);
router.post("/jobApp", applicationLetter("applications/letters").single("cover_letter"), jobApplication);


export default router;
