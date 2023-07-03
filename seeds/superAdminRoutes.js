import express from "express";
const router = express.Router();

import {
  mainAdminLogin,
  changePassword,
  allcompanies,
  allJobSeekers,
  availableJobs,
} from "./superAdminController.js";

import { mainAdminToken, verifyAdminToken } from "./superAdminMiddleware.js";
import {
  superAdminLoginValidator,
  passwordChangeValidator,
} from "./superAdminValidator.js";
import { logoUpload } from "../middleware/companyMiddleware.js";

router.post(
  "/login",
  logoUpload("").none(),
  superAdminLoginValidator,
  mainAdminToken,
  mainAdminLogin
);

router.put(
  "/changePassword",
  logoUpload("").none(),
  verifyAdminToken,
  passwordChangeValidator,
  changePassword
);

router.get("/allCompanies", verifyAdminToken, allcompanies);
router.get("/allJobSeekers", verifyAdminToken, allJobSeekers);
router.get("/allJobs", verifyAdminToken, availableJobs);

export default router;
