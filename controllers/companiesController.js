const CompaniesModel = require("../models/companiesModel");
const {v4: uuidv4 }= require('uuid');
const bcrypt = require("bcrypt");


//Company signup
const registerCompanyController = async(req,res)=>{
    try {
        
    //get company info
   const { companyName, companyEmail, password, companyPhoneNumber } = req.body
   if(!companyName||!companyEmail||!password||!companyPhoneNumber){
       console.log("check required fields");
       return;
    }
    const token = req.token;
    
   //hash the password
   const hashPassword =  await bcrypt.hash(password, 10); // await to wait for the password to finish encrypting

   //add the company to the db
   const uuid = uuidv4(); //auto generate uuid for the company

   const newCompany = {
    uuid,
    companyName,
    companyEmail, 
    password:hashPassword,
    companyPhoneNumber
   }
      //check if the company exists
      const findCompany = await CompaniesModel.findOne( {where:{ companyEmail:companyEmail }});
      if(findCompany){
          res.status(403).json("Company already exist. Please login!");
          return;
        
      }

   CompaniesModel.create(newCompany)
   .then(() => {
    res.status(201).json({message:"Company registered successfully",token});
    return;
   })
   
} 
 catch(error){
    console.log(error);
    console.log("Error creating Company!");
    res.status(500).json("failed to register Company");
   };
};

// Company login
const companyLoginController = async(req,res)=>{

    //get Company info from the body
    const { company_email, password } = req.body;

    //check if Company already exists
    const findCompany = await CompaniesModel.findOne({ company_email, password });
    //if they dont exist....
    if(!findCompany){
        res.status(403).json("Your company does not exist. Please register first!");
        return;
    }
    res.status(201).json("Login successful!");
}



module.exports = { registerCompanyController, companyLoginController };

