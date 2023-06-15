import express from "express";
const router = express.Router();

import {uploadCvController, updateCv, deleteCv} from "../controllers/uploadCvController.js";
// import jobSeekerInfoValidator from "../Validators/uploadCvValidator.js";
import uploadCvMiddleware from "../middleware/cvUploadMiddleware.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";

router.put("/uploadCv",
  // jobSeekerInfoValidator,
  verifyJobseekerToken,
  uploadCvMiddleware("public/cvs").single("cv"),
  uploadCvController);

export default router;
