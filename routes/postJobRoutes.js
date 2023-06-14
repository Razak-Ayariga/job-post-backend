import express from "express";
const router = express.Router();

import {
  postJob,
  getOneJob,
  getAllJobs,
  deleteJob,
  updateJob
  // getAllAvailableJobs,
} from "../controllers/postJobController.js";

import { companyDetails } from "../controllers/companyController.js";
import postJobValidator from "../Validators/postJobValidator.js";
import { uploadLogoMiddleware, verifyCompanyToken } from "../middleware/companyMiddleware.js";
import { getCompanyAllInfo } from "../controllers/companyController.js";

router.post(
  "/postJob",
  uploadLogoMiddleware("").none(),
  verifyCompanyToken,
  postJobValidator,
  postJob,
  getCompanyAllInfo
);

router.get("/getOne/:id", getOneJob);
router.get("/getAll/:id", getAllJobs);
router.get("/availableJobs", /*getAllAvailableJobs,*/ companyDetails);
router.delete("/deleteJob/:id", deleteJob);
router.put("/update/:id", uploadLogoMiddleware("").none(), updateJob);
// router.get("/companyDetails/:id", companyDetails);

export default router;
