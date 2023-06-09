import express from "express";
const router = express.Router();

import { verifyCompanyToken } from "../middleware/companyMiddleware.js";
import validateLocation from "../Validators/locationValidator.js";
import addLocation from "../controllers/companyLocationController.js";

router.put("/location", verifyCompanyToken, validateLocation, addLocation);

export default router;
