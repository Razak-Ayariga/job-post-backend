import express from "express";
const router = express.Router();

import {
  mainAdminLogin,
} from "./superAdminController.js";

import mainAdminToken from "./superAdminMiddleware.js"

import {
  superAdminLoginValidator, passwordChangeValidator
} from "./superAdminValidator.js";

import { uploadLogoMiddleware } from "../middleware/companyMiddleware.js"

router.post(
  "/mainAdminLogin",
  uploadLogoMiddleware("").none(),
  superAdminLoginValidator,
  mainAdminToken,
  mainAdminLogin
);

export default router;
