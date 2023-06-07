import express from "express";
const router = express.Router();

import {
  newApplicationController, getOneApplication, getAllApplication, deleteApplication,
} from "../controllers/applicationController.js";
import {
  verifyJobseekerToken,  uploadPhotoMiddleware,} from "../middleware/jobseekerAuthMiddleware.js";
// import ApplicationValidator from "../Validators/ApplicationValidators.js";

router.post("/addApplication", uploadPhotoMiddleware("").none(), verifyJobseekerToken,  // ApplicationValidator,
  newApplicationController
);

router.get("/oneApplication/:id", getOneApplication);
router.get("/allApplication/:js_id", getAllApplication);
router.delete("/deleteApplication/:id", deleteApplication);

export default router;
