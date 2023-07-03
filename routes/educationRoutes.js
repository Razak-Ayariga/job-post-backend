import express from "express";
import multer from "multer";
const router = express.Router();

import {
  creatEducation,
  updateEducation,
  getOneEducation,
  getAllEducation,
  deleteEducation
} from "../controllers/educationController.js";

import {verifyToken} from "../middleware/jobseekerAuthMiddleware.js";
import photoUpload from "../middleware/ProfileMiddleware.js";
import educationValidator from "../Validators/educationValidators.js";

const upload = multer();
router.post(
  "/addEducation",
  photoUpload("").none(),
  verifyToken,
  educationValidator,
  creatEducation
);

router.put(
  "/updateEducation/:id",
  photoUpload("").none(),
  verifyToken,
  educationValidator,
  updateEducation
);

router.get("/oneEducation/:id", getOneEducation);
router.get("/allEducation/:js_id", getAllEducation);
router.delete("/deleteEducation/:id", deleteEducation);

export default router;
