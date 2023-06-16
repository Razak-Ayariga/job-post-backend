import express from "express";
const router = express.Router();

import {
  addLanguage,
  updateLanguage,
  getAllLanguages,
  getOneLanguage,
  deleteLanguage,
} from "../controllers/languageController.js";
import languageValidator from "../Validators/languageValidator.js";
import { verifyJobseekerToken } from "../middleware/jobseekerAuthMiddleware.js";
import { uploadPhotoMiddleware } from "../middleware/jobseekerAuthMiddleware.js";
import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

router.post(
  "/addLanguage",
  uploadPhotoMiddleware("").none(),
  verifyJobseekerToken,
  languageValidator,
  addLanguage,
  getJobSeekerAllInfo
);

router.put(
  "/updateLanguage/:id",
  uploadPhotoMiddleware("").none(),
  verifyJobseekerToken,
  languageValidator,
  updateLanguage
);

router.get("/getLanguages/:js_id", verifyJobseekerToken, getAllLanguages);
router.get("/getLanguage/:id", verifyJobseekerToken, getOneLanguage);
router.delete("/deleteLanguage/:id", verifyJobseekerToken, deleteLanguage);

export default router;
