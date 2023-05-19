const JobSeekersModel = require("../models/jobSeekersModel");
const jobSeekerValidator = require("../validators/jobseekerValidator");
const {v4: uuidv4 }= require('uuid');
const bcrypt = require("bcrypt");


//Job seeker registration
const registerJobSeekerController = async (req, res) => {
    try {
        // Get job seeker information
    const { error, value } = jobSeekerValidator.validate(req.body);

    // Check if validation fails
        if (error) {
            console.log(error);
         return res.status(400).json({ error: error.details[0].message });
      
    }
        
    //get job seeker information 
   const { firstName, middleName, lastName, dateOfBirth, gender, email, password, phoneNumber } = req.body
   if(!firstName||!lastName||!dateOfBirth||!gender||!email||!password||!phoneNumber){
       console.log("check required fields");
       return;
    }
    const token = req.token;
    
   //hash the password
   const hashPassword =  await bcrypt.hash(password, 10); // await to wait for the password to finish encrypting

   //add the job seeker to the database
   const uuid = uuidv4(); //auto generate uuid for the job seeker

   const newJobSeeker = {
    uuid,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    email, 
    password:hashPassword,
    phoneNumber
   }
      //check if job seeker already exists
      const findUser = await JobSeekersModel.findOne( {where:{ email:email }});
      if(findUser){
          res.status(403).json("user already exist. Please login!");
          return;
      }

   JobSeekersModel.create(newJobSeeker)
   .then(() => {
    res.status(201).json({message:"registered successfully",token});
    return;
   })
   
} 
 catch(error){
    console.log(error);
    console.log("Error creating job seeker!");
    res.status(500).json("failed to register job seeker");
   };
};

// job seeker login
const jobSeekerLoginController = async (req, res) => {
    
const signinValidator = (req, res) => {
  const { error, value } = signinValidator.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  // my login logic
  res.status(200).json({ success: true });
   };

    //get job seeker info from the body
    const { email, password } = req.body;

    //check if job seeker already exists
    const findUser = await JobSeekersModel.findOne({ email, password });
    if(!findUser){
        res.status(403).json("user does not exist. Please register first!");
        return;
    }
    res.status(201).json("Login successful!");
}



module.exports = { registerJobSeekerController, jobSeekerLoginController };
