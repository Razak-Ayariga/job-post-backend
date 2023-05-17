const JobSeekersModel = require("../models/jobSeekersModel");
const {v4: uuidv4 }= require('uuid');
const bcrypt = require("bcrypt");


//Job seeker registration
const registerJobSeekerController = async(req,res)=>{

    //get job seeker information 
   const { fullName, dateOfBirth, gender, email, password, phoneNumber, socialMediaLinks, profilePhoto, cv} = req.body
   

   //hash the password
   const hashPassword =  await bcrypt.hash(password, 10); // await to wait for the password to finish encrypting

   //add the job seeker to the database
   const uuid = uuidv4(); //auto generate uuid for the job seeker

   const newJobSeeker = {
    uuid,
    fullName,
    dateOfBirth,
    gender,
    email, 
    hashPassword,
    phoneNumber,
    socialMediaLinks,
    profilePhoto,
    cv
   }

   JobSeekersModel.create(newJobSeeker)
   .the(() => {
    res.status(201).json("registered successfully");
    return;
   })

   .catch(error => {
    console.log(error);
    console.log("Error creating job seeker!");
    res.status(500).json("failed to register jo seeker");
   });
}

// job seeker login
const jobSeekerLoginController = async(req,res)=>{

    //get job seeker info from the body
    const { email, password } = req.body;

    //check if job seeker already exists
    const findUser = await JobSeekersModel.find({ email, password });
    if(!findUser){
        res.status(403).json("user does not exist. Please register first!");
        return;
    }
    res.status(201).json("Login successful!");
}

module.exports = { registerJobSeekerController, jobSeekerLoginController };
