import express from "express";
const router = express.Router();

import { getAllApplicants, getAppliedJobs} from "../controllers/applicationsController.js";


router.get("/getAllApplicants/:id", getAllApplicants);
router.get("/allApplication/:js_id", getAppliedJobs);
//router.delete("/deleteApplication/:id", deleteApplication);

export default router;
