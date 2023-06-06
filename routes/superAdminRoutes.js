import express from "express";
const router = express.Router();

import {
  mainAdminRegister,
  mainAdminLogin,
} from "../controllers/superAdminController";

import mainAdminToken from "../middleware/superAdminMiddleware";

import {
  registersuperAdminValidator,
  superAdminLoginValidator,
} from "../Validators/superAdminValidator.js";

router.post(
  "/mainAdminSignup",
  registersuperAdminValidator,
  mainAdminToken,
  mainAdminRegister
);
router.post(
  "/mainAdminLogin",
  superAdminLoginValidator,
  mainAdminToken,
  mainAdminLogin
);

export default router;
