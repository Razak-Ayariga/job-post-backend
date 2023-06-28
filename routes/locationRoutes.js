import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/companyMiddleware.js";
import validateLocation from "../Validators/locationValidator.js";
import {addLocation, updateLocation} from "../controllers/companyLocationController.js";
import { logoUpload } from "../middleware/companyMiddleware.js";
// import { getCompanyAllInfo } from "../controllers/companyController.js";

router.post("/addLocation",logoUpload("").none(),
    verifyToken,
    validateLocation,
    addLocation
);
router.put("/updateLocation",logoUpload("").none(), updateLocation)

export default router;
