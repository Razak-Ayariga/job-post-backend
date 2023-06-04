import express from "express";
const router = express.Router();

//import the routes
import {registerCompanyController,companyLoginController, updateCompanyInfo} from "../controllers/companyController.js";
import {companySignupToken,companyLoginToken, verifyCompanyToken, uploadLogoMiddleware} from "../middleware/companyMiddleware.js";
import {companyRegisterValidator,companyLoginValidator} from "../Validators/companyValidators.js";

router.post("/registerCompany",
    uploadLogoMiddleware("").none(),
    companyRegisterValidator,
    companySignupToken,
    registerCompanyController);

router.post("/logInCompany",
    uploadLogoMiddleware("").none(),
    companyLoginValidator,
    companyLoginToken,
    companyLoginController);

router.put("/updateInfo",
    uploadLogoMiddleware("public/logos").single("logo"),
    verifyCompanyToken,
     updateCompanyInfo
)

export default router;
