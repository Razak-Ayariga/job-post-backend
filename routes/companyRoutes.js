import express from "express";
const router = express.Router();

//import the routes
import {registerCompanyController,companyLoginController} from "../controllers/companyController.js";
import {companySignupToken,companyLoginToken /*verifyCompanyToken*/} from "../middlewares/companyMiddleware.js";
import {companyRegisterValidator,companyLoginValidator} from "../Validators/companyValidators.js";

router.post("/registerCompany",companyRegisterValidator,companySignupToken,registerCompanyController);
router.post("/logInCompany",companyLoginValidator,companyLoginToken,companyLoginController);

export default router;
