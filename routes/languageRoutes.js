import express from "express";
const router = express.Router();

import addLanguage from "../controllers/languageController.js";
import languageValidator from "../Validators/languageValidator.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";
import { uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";

router.post("/addLanguage",
    uploadPhotoMiddleware("").none(),
    verifyJobseekerToken,
    languageValidator,
    addLanguage);

export default router;