import express from "express";
const router = express.Router();

// import the routes
import addLinksController from "../controllers/jsScialLinksController.js";
import jsSocialLinksValidator from "../Validators/jsSocialLinksValidator.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";
import { uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";
import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

//use the routes
router.post(
  "/jsLinks",
  uploadPhotoMiddleware("").none(),
  verifyJobseekerToken,
  // jsSocialLinksValidator,
  addLinksController,
  // getJobSeekerAllInfo
);

export default router;
