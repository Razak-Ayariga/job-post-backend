
import express from "express";
import router from express.Router();
import  {getAllEducation, createEducation,  updateEducation, deleteEducation}  from ("../controllers/educationController");
import { EducationValidator } from "../Validators/educationValidator" ;



// Route to get all education records for a jobseeker
router.post("/add/:jobSeekerId", EducationValidator, createEducation);
router.get("/get/:jobSeekerId", getAllEducation); //EducationValidator,
router.put("/update/:Edu_id", EducationValidator, updateEducation);
router.delete("/delete/:Edu_id", deleteEducation); //EducationValidator,

export default router;

