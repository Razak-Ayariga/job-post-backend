import express from "express";
const router = express.Router();

import {jobApplication, applicantInfo, allApplications} from "../controllers/applicationsController.js";
import  applicationCv  from "../middleware/applicationsMiddleware.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";

<<<<<<< HEAD
router.post("/jobApply", verifyJobseekerToken,
  applicationCv("applications/cvs").single("cv"),
  jobApplication);
=======
router.post("/apply",
    applicationCv("applications/cvs").single("cv"),
     verifyToken,
    jobApplication);
>>>>>>> origin/Razak

router.get("/applicant/:job_id", applicantInfo);
router.get("/allApplications", verifyToken, allApplications);

export default router;
