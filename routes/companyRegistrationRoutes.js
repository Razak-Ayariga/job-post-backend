import express from "express";
const router = express.Router();

import editRegistrationInfo from "../controllers/companyRegistrationController.js";
import uploadRegistrationCertificate from "../middleware/companyRegistrationMiddleware.js";
import companyRegistrationValidator from "../Validators/companyRegistrationValidator.js";
import { verifyCompanyToken } from "../middleware/companyMiddleware.js";
import { getCompanyAllInfo } from "../controllers/companyController.js";

router.post(
  "/registrationInfo",
  uploadRegistrationCertificate("public/companyCert").single("company_certificate"),
  verifyCompanyToken,
  companyRegistrationValidator,
  editRegistrationInfo,
  getCompanyAllInfo
);

export default router;
