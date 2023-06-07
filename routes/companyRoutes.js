import express from "express";
const router = express.Router();

//import the routes
import {
  registerCompany,
  companyLoginController,
  updateCompanyInfo,
    getCompanyAllInfo,
  getAllcompanies
} from "../controllers/companyController.js";

import {
  companySignupToken,
  companyLoginToken,
  verifyCompanyToken,
  uploadLogoMiddleware,
} from "../middleware/companyMiddleware.js";

import {
  companyRegisterValidator,
  companyLoginValidator,
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
  companyLoginController
);

router.put(
  "/updateInfo",
  uploadLogoMiddleware("public/logos").single("logo"),
  verifyCompanyToken,
  updateCompanyInfo
);

router.get("/getAll", verifyCompanyToken, getCompanyAllInfo);
router.get("/allCompanies", getAllcompanies);

export default router;
