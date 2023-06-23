import express from "express";
import multer from "multer";
const router = express.Router();

import {registerJobSeeker, loginJobSeeker, getAllInfo, allJobSeekers } from "../controllers/jobSeekerController.js";
import { validatorRegistration, ValidateLogin } from "../Validators/jobseekerValidator.js";
import { findJobSeeker, jobseekerToken, verifyToken } from "../middleware/jobseekerAuthMiddleware.js";
import photoUpload from "../middleware/ProfileMiddleware.js";

const upload = multer();

router.post("/signUp",
    photoUpload("").none(),
    validatorRegistration,
    findJobSeeker,
    registerJobSeeker);

router.post("/signIn",
    photoUpload("").none(),
    ValidateLogin,
    jobseekerToken,
    loginJobSeeker);

router.get("/allInfo", verifyToken, getAllInfo);
router.get("/allJobSeekers", allJobSeekers);

export default router;