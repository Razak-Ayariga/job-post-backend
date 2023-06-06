import express from "express";
const router = express.Router();

// import the routes
import addLinksController from "../controllers/jsScialLinksController.js";
import jsSocialLinksValidator from "../Validators/jsSocialLinksValidator.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";
import { uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";

//use the routes
router.put(
  "/jsLinks",
  uploadPhotoMiddleware("").none(),
  verifyJobseekerToken,
  jsSocialLinksValidator,
  addLinksController
);

export default router;
