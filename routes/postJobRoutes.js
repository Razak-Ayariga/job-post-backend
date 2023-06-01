import express from "express";
const router = express.Router();

import postJobController from "../controllers/postJobController.js";
import postJobValidator from "../Validators/postJobValidator.js";
import { verifyCompanyToken } from "../middlewares/companyMiddleware.js";

router.post("/postJob", postJobValidator, verifyCompanyToken, postJobController);

export default router;