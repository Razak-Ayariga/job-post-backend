import express from "express";
const router = express.Router();

import {uploadCv, updateCv, deleteCv} from "../controllers/uploadCvController.js";
// import jobSeekerInfoValidator from "../Validators/uploadCvValidator.js";
import uploadCvMiddleware from "../middleware/cvUploadMiddleware.js";
<<<<<<< HEAD
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";
import uploadPhotoMiddleware from "./uploadPhotoMiddleware.js";

router.put("/uploadCv",
  // jobSeekerInfoValidator,
  verifyJobseekerToken,
  uploadCvMiddleware("public/cvs").single("cv"),
  uploadCvController);
=======
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";

router.put("/uploadCv",
    // jobSeekerInfoValidator,
    verifyToken,
    uploadCvMiddleware("public/cvs").single("cv"),
    uploadCv);
>>>>>>> origin/Razak


router.post("/upload", uploadPhotoMiddleware("uploads"), (req, res) => {
  // Access the uploaded file URL
  const photoURL = req.file.path;
  // ...
});

export default router;
