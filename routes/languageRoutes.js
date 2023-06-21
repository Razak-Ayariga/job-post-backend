import express from "express";
const router = express.Router();
import multer from "multer";

import {
  addLanguage,
  updateLanguage,
  getAllLanguages,
  getOneLanguage,
  deleteLanguage,
} from "../controllers/languageController.js";
import languageValidator from "../Validators/languageValidator.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";
import photoUpload from "../middleware/ProfileMiddleware.js";
// import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

const upload = multer();
router.post(
  "/addLanguage",
  photoUpload("").none(),
  verifyToken,
  languageValidator,
  addLanguage,
  // getJobSeekerAllInfo
);

router.put(
  "/updateLanguage/:id",
  photoUpload("").none(),
  verifyToken,
  languageValidator,
  updateLanguage
);

router.get("/getLanguages/:js_id", verifyToken, getAllLanguages);
router.get("/getLanguage/:id", verifyToken, getOneLanguage);
router.delete("/deleteLanguage/:id", verifyToken, deleteLanguage);

export default router;
