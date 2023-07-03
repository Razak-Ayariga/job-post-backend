import express from "express";
const router = express.Router();
import multer from "multer";

import {
  createExperience,
  getOneExperience,
  updateExperience,
  getAllExperience,
  deleteExperience
} from "../controllers/experienceController.js";

import addExperienceValidator from "../Validators/experienceValidator.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";
import photoUpload from "../middleware/ProfileMiddleware.js";

const upload = multer();
router.post(
  "/addExperience",
  photoUpload("").none(),
  verifyToken,
  addExperienceValidator,
  createExperience
);

router.put(
  "/updateExperience/:id",
  photoUpload("").none(),
  addExperienceValidator,
  verifyToken,
  updateExperience
);

router.delete("/deleteExperience/:id", deleteExperience);
router.get("/oneExperience/:id", getOneExperience);
router.get("/allExperience/:js_id", getAllExperience);

export default router;
