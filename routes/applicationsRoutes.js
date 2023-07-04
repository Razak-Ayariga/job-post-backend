import express from "express";
const router = express.Router();

import {jobApplication, allApplications} from "../controllers/applicationsController.js";
import  applicationCv  from "../middleware/applicationsMiddleware.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";

router.post("/apply",
  applicationCv("applications/cvs").single("cv"),
  verifyToken,
  jobApplication);

router.get("/allApplications", verifyToken, allApplications);

export default router;
