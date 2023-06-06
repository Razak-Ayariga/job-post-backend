import express from "express";
const router = express.Router();

import postJobController from "../controllers/postJobController.js";
import postJobValidator from "../Validators/postJobValidator.js";
import { uploadLogoMiddleware, verifyCompanyToken } from "../middleware/companyMiddleware.js";

router.post("/postJob",
    uploadLogoMiddleware("").none(),
    verifyCompanyToken,
    postJobValidator,
    postJobController);

export default router;