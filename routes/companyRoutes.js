import express from "express";
const router = express.Router();

//import the routes
import {registerCompanyController, companyLoginController} from "../controllers/companyController.js";
import {companyToken,/*verifyCompanyToken*/} from "../middlewares/companyAuthMiddleware.js";
import {companyRegisterValidator,companyLoginValidator} from "../Validators/companyValidator.js";

router.post("/registerCompany", companyRegisterValidator,companyToken,registerCompanyController);
router.post("/logInCompany",companyLoginValidator,companyToken,companyLoginController);

export default router;