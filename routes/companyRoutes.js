import express from "express";
const router = express.Router();

//import the routes
import {
  registerCompany,
  companyLogin,
  updateCompanyInfo,
  getCompanyAllInfo,
  getAllcompanies,
//   deleteCompany,
//   permanentDelete,
  // jobSeekerAllInfo,
  companyDetails,
  applicantInfo,
  verifyEmail,
  resetPassword
} from "../controllers/companyController.js";

import {
  findCompany,
  companyToken,
  verifyToken,
  logoUpload,
} from "../middleware/companyMiddleware.js";

import {
  companyRegisterValidator,
  companyLoginValidator
} from "../Validators/companyValidators.js";

router.post(
  "/registerCompany",
  logoUpload("").none(),
 findCompany,
  companyRegisterValidator,
  registerCompany
);

router.post(
  "/logIn",
  logoUpload("").none(),
  companyLoginValidator,
  companyToken,
  companyLogin
);

router.put(
  "/updateInfo",
  logoUpload("public/logos").single("logo"),
  verifyToken,
  updateCompanyInfo
);

router.get("/getAll", verifyToken, getCompanyAllInfo);
router.get("/allCompanies", getAllcompanies);
// router.delete("/deleteCompany/:id", deleteCompany, permanentDelete);
// router.get("/allJobSeekerInfo/:id", jobSeekerAllInfo);
router.get("/companyDetails/", verifyToken, companyDetails);
router.get("/jobApplicant/:id", applicantInfo);
router.put("/email",logoUpload("").none(), verifyEmail);
router.put("/password", logoUpload("").none(), resetPassword);

export default router;
