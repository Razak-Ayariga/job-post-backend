import express from "express";
const router = express.Router();

import {
  addExperienceController,
  getOneExperience,
  getAllExperience,
  deleteExperience
} from "../controllers/experienceController.js";

import addExperienceValidator from "../Validators/experienceValidator.js";
import { verifyJobseekerToken, uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";
import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";



router.put(
  "/addExperience",
  uploadPhotoMiddleware("").none(),
  addExperienceValidator,
  verifyJobseekerToken,
  addExperienceController,
  getJobSeekerAllInfo
);

router.delete("/deleteExperience/:id", deleteExperience);
router.get("/oneExperience/:id", getOneExperience);
router.get("/allExperience/:js_id", getAllExperience);

export default router;
