import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/companyMiddleware.js";
import validateLocation from "../Validators/locationValidator.js";
import {addLocation, updateLocation} from "../controllers/companyLocationController.js";
import { logoUpload } from "../middleware/companyMiddleware.js";

router.post("/addLocation",logoUpload("").none(),
  verifyToken,
  validateLocation,
  addLocation
);
router.put("/updateLocation/:id",logoUpload("").none(), updateLocation);

export default router;
