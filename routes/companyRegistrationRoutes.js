import express from "express";
const router = express.Router();

import { newRegistration, updateRegistration } from "../controllers/companyRegistrationController.js";
import uploadRegistrationCertificate from "../middleware/companyRegistrationMiddleware.js";
import companyRegistrationValidator from "../Validators/companyRegistrationValidator.js";
<<<<<<< HEAD
import { verifyCompanyToken } from "../middleware/companyMiddleware.js";
import {getCompanyAllInfo, verifyEmail, resetPassword} from "../controllers/companyController.js";
=======
import { verifyToken } from "../middleware/companyMiddleware.js";
// import { getCompanyAllInfo } from "../controllers/companyController.js";
>>>>>>> origin/Razak

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

router.post("/email", verifyEmail);
router.put("/password", resetPassword);

export default router;
