import express from "express";
const router = express.Router();

import { mainAdminLogin, changePassword, getAllcompanies } from "./superAdminController.js";
import { mainAdminToken, verifyAdminToken } from "./superAdminMiddleware.js";
import { superAdminLoginValidator, passwordChangeValidator } from "./superAdminValidator.js";
import { getAllJobSeekers } from "../controllers/jobSeekersController.js";
import { uploadLogoMiddleware } from "../middleware/companyMiddleware.js";
import { getAllAvailableJobs } from "../controllers/companyController.js";

router.post(
  "/mainAdminLogin",
  uploadLogoMiddleware("").none(),
  superAdminLoginValidator,
  mainAdminToken,
  mainAdminLogin
);

router.put(
  "/changePassword",
  uploadLogoMiddleware("").none(),
  verifyAdminToken,
  passwordChangeValidator,
  changePassword
);

router.get("/allCompanies", verifyAdminToken, getAllcompanies);
router.get("/allJobSeekers", verifyAdminToken, getAllJobSeekers);
router.get("/allJobs", verifyAdminToken, getAllAvailableJobs);

export default router;
