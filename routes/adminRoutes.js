const express = ("express")
const router = express.Router()

const { 
    registerJobSeekerController, 
    jobSeekerLoginController
} = require("../controllers/adminController");

const {
  jobSeekerRegisterValidator,
  jobSeekerLogInValidator
} = require("../validators/adminValidator");

const {
     generateToken,
     verifyToken
    } = require("../middleware/authMiddleware")


router.post("/registerAdminController",jobSeekerRegisterValidator, generateToken, registerJobSeekerController); //check if its corrected.
router.post("/adminLoginController",jobSeekerLogInValidator, verifyToken, jobSeekerLoginController);
