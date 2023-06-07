import express from "express";
const router = express.Router();

import { postJob, getOneJob, getAllJobs, deleteJob, getAllAvailableJobs } from "../controllers/postJobController.js";
import postJobValidator from "../Validators/postJobValidator.js";
import { uploadLogoMiddleware, verifyCompanyToken } from "../middleware/companyMiddleware.js";

router.post("/postJob",
    uploadLogoMiddleware("").none(),
    verifyCompanyToken,
    postJobValidator,
    postJob);

router.get("/getOne/:id", getOneJob);
router.get("/getAll/:id", getAllJobs);
router.get("/availableJobs", getAllAvailableJobs);
router.delete("/deleteJob/:id", deleteJob);

export default router;