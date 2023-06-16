import express from "express";
const router = express.Router();

import {uploadCvController, updateCv, deleteCv} from "../controllers/uploadCvController.js";
// import jobSeekerInfoValidator from "../Validators/uploadCvValidator.js";
import uploadCvMiddleware from "../middleware/cvUploadMiddleware.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";
import uploadPhotoMiddleware from "./uploadPhotoMiddleware.js";

router.put("/uploadCv",
  // jobSeekerInfoValidator,
  verifyJobseekerToken,
  uploadCvMiddleware("public/cvs").single("cv"),
  uploadCvController);


router.post("/upload", uploadPhotoMiddleware("uploads"), (req, res) => {
  // Access the uploaded file URL
  const photoURL = req.file.path;
  // ...
});

export default router;
