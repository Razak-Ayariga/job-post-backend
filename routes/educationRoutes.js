const express = require("express");
const router = express.Router();

const { EducationValidator } = require("../Validators/educationValidator")


router.post("/education",EducationValidator);


module.exports = router