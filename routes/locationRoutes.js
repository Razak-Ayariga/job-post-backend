import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/companyMiddleware.js";
import validateLocation from "../Validators/locationValidator.js";
import addLocation from "../controllers/companyLocationController.js";
import { logoUpload } from "../middleware/companyMiddleware.js";
// import { getCompanyAllInfo } from "../controllers/companyController.js";

<<<<<<< HEAD
router.put("/location", uploadLogoMiddleware("").none(),
  verifyCompanyToken,
  validateLocation,
  addLocation,
  getCompanyAllInfo
=======
router.post("/addLocation",logoUpload("").none(),
    verifyToken,
    validateLocation,
    addLocation,
    // getCompanyAllInfo
>>>>>>> origin/Razak
);

export default router;
