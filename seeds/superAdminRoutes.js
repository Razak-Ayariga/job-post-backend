import express from "express";
const router = express.Router();

import { mainAdminLogin, changePassword, getAllcompanies } from "./superAdminController.js";
import { mainAdminToken, verifyAdminToken } from "./superAdminMiddleware.js";
import { superAdminLoginValidator, passwordChangeValidator } from "./superAdminValidator.js";
// import { getAllJobSeekers } from "../controllers/jobSeekerProfileController.js";
import { logoUpload } from "../middleware/companyMiddleware.js";
import { getAllAvailableJobs } from "../controllers/companyController.js";

router.post(
  "/mainAdminLogin",
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

router.get("/allCompanies", verifyAdminToken, verifyAdminToken, getAllcompanies);
router.get("/allJobSeekers", verifyAdminToken, verifyAdminToken,
  // getAllJobSeekers
);
router.get("/allJobs", verifyAdminToken, verifyAdminToken, getAllAvailableJobs);

export default router;
