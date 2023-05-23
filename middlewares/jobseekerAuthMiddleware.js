import JobSeekersModel from "../models/jobSeekersModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//middleware to check if job seeker exists in the database and generate a JWT
const jobseekerToken = async (req, res, next) => {
  try{
    // const newJobSeeker = req.body;
    const {email}  = req.body;
    const findUser = await JobSeekersModel.findOne( {where:{ email:email }});
      if(findUser){
          res.status(403).json("user already exist. Please login!");
          return;
      }

   // generate a token for job seeker for registeration
        jwt.sign( email , jwtSecret, (error, token) => {
          if(error){
            res.status(400).json({message: " validation error"})
          } else{
            req.token = token;
            next();
          }
        });
} 
 catch(error){
    console.log(error);
    res.status(500).json({message: "failed to register job seeker"});
   };
};

//middleware to verify token
const verifyJobseekerToken = (req, res, next) => {
const token = req.headers.token;
if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
jwt.verify(token, jwtSecret, (error, userInfo) => {
    if (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

// Token is valid, attach to the request object
    req.userId = userInfo.email;

    next(); // Proceed to the next middleware
  });
};


export { jobseekerToken, verifyJobseekerToken }