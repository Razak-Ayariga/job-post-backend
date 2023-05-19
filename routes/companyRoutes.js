const express = require("express");
const router = express.Router();

const { registerCompanyController, companyLoginController } = require("../controllers/companiesController");
const { companyRegisterValidator, companyLogInValidator } = require("../Validators/companyValidator")
const { companyToken, verifyCompanyToken } = require("../middlewares/companiesAuthMiddleware")



router.post("/registerCompany",companyRegisterValidator, companyToken, registerCompanyController);
router.post("/companyLogin",companyLogInValidator, verifyCompanyToken, companyLoginController);


module.exports = router