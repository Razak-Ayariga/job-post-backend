import express from "express";
const router = express.Router();

import { newEducationController, getOneEducation, getAllEducation, deleteEducation } from "../controllers/educationController.js";
import { verifyJobseekerToken, uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";
import educationValidator from "../Validators/educationValidators.js";
import { getAllJobSeekers, getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";
// import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

router.post(
  "/addEducation",
  uploadPhotoMiddleware("").none(),
  verifyJobseekerToken,
  educationValidator,
  newEducationController
);

router.put(
  "/updateEducation/:id",
  uploadPhotoMiddleware("").none(),
  verifyJobseekerToken,
  educationValidator,
  updateEducation,
  getAllJobSeekers
);

router.get("/oneEducation/:id", getOneEducation);
router.get("/allEducation/:js_id", getAllEducation);
router.delete("/deleteEducation/:id", deleteEducation);
router.update("/updateEducation/:id", updateEducation)

export default router;
