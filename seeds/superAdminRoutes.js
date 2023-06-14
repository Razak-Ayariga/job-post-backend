import express from "express";
const router = express.Router();

import { mainAdminLogin, changePassword } from "./superAdminController.js";
import { mainAdminToken, verifyAdminToken } from "./superAdminMiddleware.js";
import {superAdminLoginValidator,passwordChangeValidator} from "./superAdminValidator.js";

import { uploadLogoMiddleware } from "../middleware/companyMiddleware.js";

router.post(
  "/mainAdminLogin",
  uploadLogoMiddleware("").none(),
  superAdminLoginValidator,
  mainAdminToken,
  mainAdminLogin
);

router.put(
  "/changePassword",
  uploadLogoMiddleware("").none(),
  verifyAdminToken,
  passwordChangeValidator,
  changePassword
);

export default router;
