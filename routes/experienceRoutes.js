import express from "express";
const router = express.Router();

import { addExperienceController, deleteExperience } from "../controllers/experienceController.js";
import addExperienceValidator from "../Validators/experienceValidator.js";
// import uploadCvMiddleware from "../middlewares/experienceMiddleware.js";
import { verifyJobseekerToken } from "../middlewares/jobSeekerAuthMiddleware.js";

router.put("/addExperience", addExperienceValidator,verifyJobseekerToken,addExperienceController);
router.delete("/deleteExperience/:exp_id", deleteExperience);
        
export default router;