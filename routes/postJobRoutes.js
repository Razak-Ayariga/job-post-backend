import express from "express";
const router = express.Router();

import {
  postJob,
  getOneJob,
  getAllJobs,
  deleteJob,
  updateJob,
} from "../controllers/postJobController.js";

import postJobValidator from "../Validators/postJobValidator.js";
import {
  logoUpload,
  verifyToken,
} from "../middleware/companyMiddleware.js";
import { getCompanyAllInfo } from "../controllers/companyController.js";

router.post(
  "/postJob",
  logoUpload("").none(),
  verifyToken,
  postJobValidator,
  postJob,
  getCompanyAllInfo
);

router.get("/getOneJob/:id", getOneJob);
router.get("/getAllJobs/:id", getAllJobs);
router.delete("/deleteJob/:id", deleteJob);
router.put(
  "/updateJob/:id",
  logoUpload("").none(),
  verifyToken,
  updateJob
);

export default router;
