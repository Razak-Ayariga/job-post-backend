import express from "express";
const router = express.Router();

import postJobController from "../controllers/postJobController.js";
import postJobValidator from "../Validators/postJobValidator.js";

router.post("/postJob",postJobValidator, postJobController);

export default router;