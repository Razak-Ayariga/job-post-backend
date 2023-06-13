import express from "express";
const router = express.Router();

import {
  mainAdminLogin,
} from "./superAdminController.js";

import mainAdminToken from "./superAdminMiddleware.js"

import {
  superAdminLoginValidator, passwordChangeValidator
} from "./superAdminValidator.js";

router.post(
  "/mainAdminLogin",
  superAdminLoginValidator,
  mainAdminToken,
  mainAdminLogin
);

export default router;
