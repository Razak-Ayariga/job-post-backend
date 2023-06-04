import express from "express";
const router = express.Router();

import postJobController from "../controllers/postJobController.js";
import postJobValidator from "../Validators/postJobValidator.js";
// import { verifyCompanyToken } from "../middlewares/companyMiddleware.js";
import { uploadLogoMiddleware } from "../middleware/companyMiddleware.js";

router.post("/postJob",
    uploadLogoMiddleware("").none(),
    // verifyCompanyToken,
    postJobValidator,
    postJobController);

export default router;