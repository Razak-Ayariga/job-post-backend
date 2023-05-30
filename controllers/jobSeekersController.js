import JobSeekersModel from "../models/jobSeekersModel.js";
import {v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

//Job seeker registration
const registerJobSeekerController = async(req,res)=>{
    try {
//get job seeker information 
const newJobSeeker = req.body;
const token = req.token;
const password = newJobSeeker.password

//hash the password
const hashPassword =  await bcrypt.hash(password, 10); // await to wait for the password to finish encrypting
//add the job seeker to the database
const uuid = uuidv4(); 
    newJobSeeker["uuid"]= uuid
    newJobSeeker['password']=hashPassword

    JobSeekersModel.create(newJobSeeker)
   .then(() => {
    res.status(201).json({message:"registered successfully", token});
    return;
   })
} 
 catch(error){
    res.status(500).json({message: "failed to register job seeker"});
   };
};

// job seeker login
const jobSeekerLoginController = async(req,res)=>{
const token = req.token;
    res.status(201).json({message: "Login successful!", token});
}

export { registerJobSeekerController, jobSeekerLoginController };
