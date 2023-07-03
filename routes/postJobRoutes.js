import express from "express";
const router = express.Router();

import {
  postJob,
  updateJob,
  getOneJob,
  getAllJobs,
  getCompanyAllJobs,
  allJobApplicants,
  updateApplicantStatus,
  deleteJob
} from "../controllers/postJobController.js";

import postJobValidator from "../Validators/postJobValidator.js";
import {logoUpload, verifyToken} from "../middleware/companyMiddleware.js";

router.post(
  "/postJob",
  logoUpload("").none(),
  verifyToken,
  postJobValidator,
  postJob
);

router.get("/getOneJob/:id", getOneJob);
router.get("/getAllJobs/:id", getCompanyAllJobs);
router.get("/allApplicants/:id", allJobApplicants);
router.get("/allJobs", getAllJobs);
router.delete("/deleteJob/:id", deleteJob);
router.put("/updateJob/:id", logoUpload("").none(),verifyToken,updateJob);
router.put("/application/status",logoUpload("").none(), updateApplicantStatus);

export default router;
