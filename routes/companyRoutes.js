import express from "express";
const router = express.Router();

//import the routes
import {
  registerCompany,
  companyLogin,
  updateCompanyInfo,
  getCompanyAllInfo,
  getAllcompanies,
  deleteCompany,
  jobSeekerAllInfo,
  companyDetails,
  applicantInfo
} from "../controllers/companyController.js";

import {
  companySignupToken,
  companyLoginToken,
  verifyCompanyToken,
  uploadLogoMiddleware,
} from "../middleware/companyMiddleware.js";

import {
  companyRegisterValidator,
  companyLoginValidator
} from "../Validators/companyValidators.js";

router.post(
  "/registerCompany",
  uploadLogoMiddleware("").none(),
  companyRegisterValidator,
  companySignupToken,
  registerCompany
);

router.post(
  "/logInCompany",
  uploadLogoMiddleware("").none(),
  companyLoginValidator,
  companyLoginToken,
  companyLogin,
  getCompanyAllInfo
);

router.put(
  "/updateInfo",
  uploadLogoMiddleware("public/logos").single("logo"),
  verifyCompanyToken,
  updateCompanyInfo
);

router.get("/getAll", verifyCompanyToken, getCompanyAllInfo);
router.get("/allCompanies", getAllcompanies);
router.delete("/deleteCompany/:id", deleteCompany);
router.get("/allJobSeekerInfo/:id", jobSeekerAllInfo);
router.get("/companyDetails/", verifyCompanyToken, companyDetails);
router.get("/jobApplicant/:id", applicantInfo)

export default router;
