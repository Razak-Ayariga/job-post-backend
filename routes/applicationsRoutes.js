import express from "express"
const router = express.Router();

import {jobApplication, applicantInfo, allJobApplications} from "../controllers/applicationsController.js";
import  applicationCv  from "../middleware/applicationsMiddleware.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";

router.post("/apply", verifyToken,
    applicationCv("applications/cvs").single("cv"),
    jobApplication);

router.get("/jobApplicant/:job_id", applicantInfo);
router.get("/allApplications", verifyToken, allJobApplications);

export default router;