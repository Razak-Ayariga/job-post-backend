
const express = require ("express");
const router = express.Router();
const { getAllEducation } = require("../controllers/educationController");
const { createEducation } = require("../controllers/educationController");
const { updateEducation } = require("../controllers/educationController");
const { deleteEducation } = require("../controllers/educationController");
const { EducationValidator } = require("../Validators/educationValidator");



// Route to get all education records for a jobseeker
router.post("/add/:jobSeekerId", EducationValidator, createEducation);
router.get("/get/:jobSeekerId", getAllEducation); //EducationValidator,
router.put("/update/:Edu_id", EducationValidator, updateEducation);
router.delete("/delete/:Edu_id", deleteEducation); //EducationValidator,

module.exports = router;

