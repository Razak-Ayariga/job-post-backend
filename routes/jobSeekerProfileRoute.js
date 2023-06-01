import express from "express";
const router = express.Router();

// import the routes
import uploadPhotoController from "../controllers/JobSeekerProfileController.js";
// import JobSeekerProfileValidator from "../Validators/JobSeekerProfileValidator.js";
import uploadMiddleware from "../middlewares/JobSeekerProfileMiddleware.js";
import { verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

//use the routes
router.put("/jobSeekerProfile",verifyJobseekerToken, uploadMiddleware("public/uploads").single("photo"),
   // JobSeekerProfileValidator,
   uploadPhotoController
);

export default router;