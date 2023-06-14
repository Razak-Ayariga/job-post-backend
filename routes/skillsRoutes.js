import express from "express";
const router = express.Router();
import {
  getAllSkills,
  createSkills,
  updateSkills,
  deleteSkill
} from "../controllers/SkillsController.js";
import skillsValidator from "../Validators/skillsValidator.js";
import { verifyJobseekerToken, uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";
import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

// Route to get all Skills records for a jobseeker
router.post(
  "/addSkills",
  uploadPhotoMiddleware("").none(),
  skillsValidator,
  verifyJobseekerToken,
  createSkills,
  getJobSeekerAllInfo
);
router.get("/getSkills/:id", getAllSkills);
router.put(
  "/updateSkills/:id",
  skillsValidator,
  verifyJobseekerToken,
  updateSkills
);
router.delete("/deleteSkill/:id", deleteSkill, verifyJobseekerToken);

export default router;
