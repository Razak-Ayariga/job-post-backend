import express from "express";
const router = express.Router();

// import the routes
import addLinksController from "../controllers/jsScialLinksController.js";
import jsSocialLinksValidator from "../Validators/jsSocialLinksValidator.js";
import { verifyJobseekerToken } from "../middlewares/jobseekerAuthMiddleware.js";

//use the routes
router.put("/jsLinks",verifyJobseekerToken, jsSocialLinksValidator,addLinksController);

export default router;