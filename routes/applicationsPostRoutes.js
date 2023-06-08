import express from "express";
const router = express.Router();

import {
  getAllApplicants,
  getAppliedJobs,
  applyForJob
} from "../controllers/applicationsPostController.js";

router.get("/getAllApplicants/:id", getAllApplicants);
router.get("/getAppliedJobs/:js_id", getAppliedJobs);
router.post("/applyForJob", applyForJob);

export default router;
