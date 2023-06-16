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
router.delete("/deleteJob/:id", deleteJob);
router.put("/update/:id", uploadLogoMiddleware("").none(), verifyCompanyToken, updateJob);


export default router;
