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


    //check if job seeker already exists
    newJobSeeker["uuid"]= uuid
    newJobSeeker['password']=hashPassword

const findUser = await JobSeekersModel.findOne( {where:{ email:newJobSeeker.email }});
      if(findUser){
        const passwordMatch = bcrypt.compare(password,findUser.password);
        if(passwordMatch){
          res.status(403).json("user already exist. Please login!");
          return;
        }  
        }
    
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
        res.status(401).json({message: "email or password"});
    }
    res.status(201).json({message: "Login successful!"});
}



export { registerJobSeekerController, jobSeekerLoginController };
