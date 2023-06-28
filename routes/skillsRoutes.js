import express from "express";
const router = express.Router();
import multer from "multer";

import {
  getAllSkills,
  createSkills,
  updateSkills,
  deleteSkill,
} from "../controllers/skillsController.js";
import skillsValidator from "../Validators/skillsValidator.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";
import photoUpload from "../middleware/ProfileMiddleware.js";
// import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

const upload = multer();
router.post(
  "/addSkills",
  photoUpload("").none(),
  skillsValidator,
  verifyToken,
  createSkills,
);
router.get("/getSkills/:id", getAllSkills);
router.put(
  "/updateSkills/:id",
   photoUpload("").none(),
  skillsValidator,
  verifyToken,
  updateSkills
);
router.delete("/deleteSkill/:id", deleteSkill, verifyToken);

export default router;
