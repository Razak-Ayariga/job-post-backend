import express from "express";
const router = express.Router();

import {jobApplication, applicantInfo} from "../controllers/applicationsController.js";
import  applicationCv  from "../middleware/applicationsMiddleware.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";

router.post("/jobApply", verifyJobseekerToken,
    applicationCv("applications/cvs").single("cv"),
    jobApplication);

    router.get("/jobApplicant/:company_id", applicantInfo)

export default router;
