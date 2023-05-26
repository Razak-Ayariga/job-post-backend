
import express from "express";
//import router from express.Router();
const router = express.Router();
import  {getAllEducation, createEducation,  updateEducation, deleteEducation}  from "../controllers/educationController.js";
import EducationValidator  from "../Validators/educationValidator.js" ;



// Route to get all education records for a jobseeker
router.post("/addEducation", EducationValidator, createEducation);
router.get("/get/:jobSeekerId", getAllEducation); //EducationValidator,
router.put("/update/:Edu_id", EducationValidator, updateEducation);
router.delete("/delete/:Edu_id", deleteEducation); //EducationValidator,

export default router;

