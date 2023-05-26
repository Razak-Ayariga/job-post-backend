import express from "express";
const router = express.Router();

//import the routes
import { registerAdminController, adminLoginController } from "../controllers/adminController.js";
import { adminRegisterValidator, adminLogInValidator } from "../Validators/adminValidator.js";
import { adminToken /*verifyAdminToken*/} from "../middlewares/adminAuthMiddleware.js";

//use the imported routes
router.post("/registerAdmin",adminRegisterValidator, adminToken, registerAdminController);
router.post("/adminLogin",adminLogInValidator, adminToken, adminLoginController);


export default router