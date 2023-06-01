import express from "express";
const router = express.Router();
import {getAllSkills, createSkills, updateSkills, deleteSkills,} from "../controllers/skillsController.js";
import skillsValidator from "../Validators/skillsValidator.js";
import { verifyJobseekerToken } from "../middlewares/jobSeekerAuthMiddleware.js";

// Route to get all Skills records for a jobseeker
router.post("/addSkills", skillsValidator, verifyJobseekerToken, createSkills);
router.get("/getSkills/:edu_id", getAllSkills); //SkillsValidator,
router.put("/updateSkills/:edu_id", skillsValidator, updateSkills);
router.delete("/deleteSkills/:edu_id", deleteSkills); //SkillsValidator,

export default router;
