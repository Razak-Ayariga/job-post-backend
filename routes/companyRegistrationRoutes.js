import express from "express";
const router = express.Router();

import { newRegistration, updateRegistration } from "../controllers/companyRegistrationController.js";
import uploadRegistrationCertificate from "../middleware/companyRegistrationMiddleware.js";
import companyRegistrationValidator from "../Validators/companyRegistrationValidator.js";
import { verifyToken } from "../middleware/companyMiddleware.js";
// import { getCompanyAllInfo } from "../controllers/companyController.js";

router.post(
  "/registration",
  uploadRegistrationCertificate("public/companyCert").single("company_certificate"),
  verifyToken,
  companyRegistrationValidator,
  newRegistration,
  // getCompanyAllInfo
);
router.put("/updateRegistration/:id",
  uploadRegistrationCertificate("").single(),
  verifyToken,
  updateRegistration);

export default router;
