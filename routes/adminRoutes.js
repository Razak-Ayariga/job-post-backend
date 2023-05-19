const express = require("express");
const router = express.Router();

//import the routes
const { registerAdminController, adminLoginController } = require("../controllers/adminController");
const { adminRegisterValidator, adminLogInValidator } = require("../Validators/adminValidator")
const { adminToken, verifyAdminToken} = require("../middlewares/adminAuthMiddleware")

//use the imported routes
router.post("/registerAdmin",adminRegisterValidator, adminToken, registerAdminController);
router.post("/adminLogin",adminLogInValidator, verifyAdminToken, adminLoginController);


module.exports = router