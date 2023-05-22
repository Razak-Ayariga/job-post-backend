import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
// const { jobSeekersModel} = require('../models/jobSeekersModel');



//middleware to check if job seeker exists in the database and generate a JWT
const jobseekerToken = async (req, res, next) => {
    
  const { email } = req.body;

  
      //  generate a token for job seeker
        jwt.sign( email , jwtSecret, (error, token) => {
          if(error){
            res.status(400).json({message: " validation error"})
          } else{
            req.token = token;
            next();
          }

        });
      } 
    



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