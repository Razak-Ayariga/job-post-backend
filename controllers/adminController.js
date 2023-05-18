const adminModel = require("../models/adminModel");
const adminValidator = require("../validators/adminValidator");
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");

//admin registration
const registerAdminController = async(req,res) => {
    try {
    
        // get admin info
        const { firstName, middleNAame, lastName, gender, companyEmail, role, password} = req.body;
        if(!firstName || middleNAame || lastName || gender || companyEmail || role ||password){
            console.log("check required fields!");
            return;
        }

        const token = req.token;

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);// await to wait for the password to finish encrypting

        // add admin to the database
        const uuid = uuidv4();

        const newAdmin = {
            uuid,
            firstName,
            middleNAame,
            lastName,
            gender,
            companyEmail,
            hashPassword,
        }

        //check if admin already exist
        const findUser = await adminModel.findOne({ email, password });
        if(findUser){
            res.status(400).json({message: "Administrator already exists. Please login!", token});
            return;
        }

        adminModel.create(newAdmin)
        .then(() => {
            res.status(200).json({message: "Administrator registered successfully!"});
        });
    } catch(error){
        console.log(error);
        console.log("Error creating Administrator!");
        res.status(401).json({message: "Failed to register administrator!"})
    };
};

//admin login
const adminLoginController = async (req, res) => {

    // get admin login credentials from the body
    const { email, password} = req.body;

    //check if admin already exists
    const findUser = await adminModel.findOne({ email, password});
    if(!findUser){
        res.status(403).json({message: "Administrator does not esxist!. Please register first"});
        return;
    }
    res.status(201).json({message: "Login successful!"});
 };

 module.exports = { registerAdminController, adminLoginController}