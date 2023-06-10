import express from "express";
const router = express.Router();

import { verifyCompanyToken } from "../middleware/companyMiddleware.js";
import validateLocation from "../Validators/locationValidator.js";
import addLocation from "../controllers/companyLocationController.js";
import { uploadLogoMiddleware } from "../middleware/companyMiddleware.js";

router.put("/location",uploadLogoMiddleware("").none(), verifyCompanyToken, validateLocation, addLocation);

export default router;
