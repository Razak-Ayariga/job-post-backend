import express from "express";
const router = express.Router();
import multer from "multer";

// import the routes
import {addLinksController, updateLinks, deleteLink} from "../controllers/jsScialLinksController.js";
import jsSocialLinksValidator from "../Validators/jsSocialLinksValidator.js";
import { verifyToken } from "../middleware/jobseekerAuthMiddleware.js";
import photoUpload from "../middleware/ProfileMiddleware.js";
// import { getJobSeekerAllInfo } from "../controllers/jobSeekersController.js";

//use the routes
const upload = multer();
router.post(
  "/jsLinks",
  photoUpload("").none(),
  verifyToken,
  jsSocialLinksValidator,
  addLinksController,
  // getJobSeekerAllInfo
);

router.put("/update/:id", photoUpload("").none(), updateLinks);
router.delete("/delete/:id", deleteLink);

export default router;
