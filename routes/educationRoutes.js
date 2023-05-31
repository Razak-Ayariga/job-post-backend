
import express from "express";
const router = express.Router();
import  {getAllEducation, createEducation,  updateEducation, deleteEducation}  from "../controllers/educationController.js";
import EducationValidator  from "../Validators/educationValidator.js" ;

// Route to get all education records for a jobseeker
router.post("/addEducation/:js_id", EducationValidator, createEducation);
router.get("/getEducation/:edu_id", getAllEducation); //EducationValidator,
router.put("/updateEducation/:edu_id", EducationValidator, updateEducation);
router.delete("/deleteEducation/:edu_id", deleteEducation); //EducationValidator,

export default router;

