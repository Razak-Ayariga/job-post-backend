import express from "express";
const router = express.Router();

import {uploadCv, updateCv, deleteCv} from "../controllers/uploadCvController.js";
// import jobSeekerInfoValidator from "../Validators/uploadCvValidator.js";
import uploadCvMiddleware from "../middleware/cvUploadMiddleware.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";

router.put("/uploadCv",
    // jobSeekerInfoValidator,
    verifyToken,
    uploadCvMiddleware("public/cvs").single("cv"),
    uploadCv);

router.put("/updateCv/:id", uploadCvMiddleware("public/cvs").single("cv"), updateCv);
router.delete("/delete/:id", deleteCv);

export default router;