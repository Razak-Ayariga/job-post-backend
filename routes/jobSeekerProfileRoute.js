import express from "express";
const router = express.Router();

// import the routes
import uploadFilesController from "../controllers/JobSeekerProfileController.js";
import JobSeekerProfileValidator from "../Validators/JobSeekerProfileValidator.js";
import uploadMiddleware from "../middlewares/JobSeekerProfileMiddleware.js";

//use the routes
router.put("/jobSeekerProfile", 
           uploadMiddleware.single("file"), 
        //    uploadMiddleware.single("cv"), 
           JobSeekerProfileValidator, 
           uploadFilesController
           );

export default router;