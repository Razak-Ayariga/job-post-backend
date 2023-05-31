import express from "express";
const router = express.Router();

import companyProfileController from "../controllers/companyInfoController.js";
import companyProfileValidator from "../Validators/compnayInfoValidator.js";
import { verifyCompanyToken } from "../middlewares/companyMiddleware.js";

router.post("/companyInfo",
    companyProfileValidator,
    verifyCompanyToken,
    companyProfileController);

export default router;


