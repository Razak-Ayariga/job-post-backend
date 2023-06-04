import express from "express";
const router = express.Router();

import {addExperienceController,getOneExperience,getAllExperience,deleteExperience} from "../controllers/experienceController.js";
import addExperienceValidator from "../Validators/experienceValidator.js";
import {verifyJobseekerToken,uploadPhotoMiddleware} from "../middleware/jobseekerAuthMiddleware.js";

router.put(
  "/addExperience",
  uploadPhotoMiddleware("").none(),
  addExperienceValidator,
  verifyJobseekerToken,
  addExperienceController
);

router.delete("/deleteExperience/:id",uploadPhotoMiddleware("").none(),deleteExperience);
router.get("/oneExperience/:id",uploadPhotoMiddleware("").none(),getOneExperience);
router.get("allExperience/:id",uploadPhotoMiddleware("").none(),getAllExperience);

export default router;
