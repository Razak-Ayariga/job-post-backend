const express = require("express");
const router = express.Router();

const { 
    registerAdminController,
    adminLoginController
    } = require("../controllers/adminController");


    router.post("/registerAdmin", registerAdminController);
    router.post("/adminLogin", adminLoginController);


    module.exports = router