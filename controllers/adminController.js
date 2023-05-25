import adminModel from "../models/adminModel.js";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";

//admin registration
const registerAdminController = async(req,res) => {
    try {
    
        // get admin info
        const newAdmin = req.body;
        const token = req.token;
        const password = newAdmin.password;

        //hash password
      const hashPassword = await bcrypt.hash(password, 10);// await to wait for the password to finish encrypting
      const uuid = uuidv4();
        // add admin to the database
     newAdmin["uuid"]= uuid;
     newAdmin["password"]= hashPassword;

        adminModel.create(newAdmin)
        .then(() => {
            res.status(201).json({message: "Administrator registered successfully!", token});
            return;
        });
    } catch(error){ 
        res.status(401).json({message: "Failed to register administrator!"})
    };
};

//admin login
const adminLoginController = async (req, res) => {

    // get admin login credentials from the body
    const { companyEmail, password} = req.body;

    //check if admin already exists
    const findUser = await adminModel.findOne({ where: { companyEmail:companyEmail } });
    if(!findUser){
        res.status(403).json({message: "user does not exist. Please register first!"});
        return;
    };
    const passwordMatch = await bcrypt.compare(password, findUser.password);
        if(!passwordMatch){
        res.status(401).json({message: "email or password does not match"});
        }
    res.status(201).json({message: "Login successful!"});
 };

 export { registerAdminController, adminLoginController};