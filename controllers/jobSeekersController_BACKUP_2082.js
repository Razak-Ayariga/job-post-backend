<<<<<<< HEAD
const JobSeekersModel = require("../models/jobSeekersModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
=======
import JobSeekersModel from "../models/jobSeekersModel.js";
import {v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
>>>>>>> origin/Razak

//Job seeker registration
<<<<<<< HEAD
const registerJobSeekerController = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phoneNumber,
  } = req.body;
  try {
    const token = req.token;

    //hash the password
    const hashPassword = await bcrypt.hashSync(password, 10); // await to wait for the password to finish encrypting
    console.log(hashPassword);
    //add the job seeker to the database
    const newJobSeeker = {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      email,
      password: hashPassword,
      phoneNumber,
    };
    console.log(newJobSeeker);
    // check if job seeker already exists
    const findUser = await JobSeekersModel.findOne({ where: { email: email } });
    if (findUser) {
      res.status(403).json("user already exist. Please login!");
      return;
    }

    JobSeekersModel.create(newJobSeeker).then(() => {
      res.status(201).json({ message: "registered successfully", token });
      return;
    });
  } catch (error) {
    console.log(error);
    console.log("Error creating job seeker!");
    res.status(500).json("failed to register job seeker");
  }
};

// job seeker login
const jobSeekerLoginController = async (req, res) => {
  //get job seeker info from the body
  const { email, password } = req.body;
  //check if job seeker already exists
  const findUser = await JobSeekersModel.findOne({ email, password });
  if (!findUser) {
    res.status(403).json("user does not exist. Please register first!");
    return;
  }
  res.status(201).json("Login successful!");
};
=======
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
    console.log(error);
    res.status(500).json({message: "failed to register job seeker"});
   };
};

// job seeker login
const jobSeekerLoginController = async(req,res)=>{

    //get job seeker info from the body
const { email, password } = req.body;

    //check if job seeker already exists
const findUser = await JobSeekersModel.findOne({ where: {email:email} });
    if(!findUser){
        res.status(403).json({message: "user does not exist. Please register first!"});
        return;
    }
    const passwordMatch=bcrypt.compare(password,findUser.password)
    if (!passwordMatch) {
        res.status(401).json({message: "email or password does not match"});
    }
    res.status(201).json({message: "Login successful!"});
}


>>>>>>> origin/Razak

export { registerJobSeekerController, jobSeekerLoginController };
