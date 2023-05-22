import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
// const { admin } = require("../models/adminModel");


const adminToken = async (req, res, next) => {
  const { companyEmail } = req.body;
//  console.log(companyEmail);
  // generate token for admin
  jwt.sign( companyEmail, jwtSecret, (error, token) =>{
    if(error){
      res.status(400).json({message: "validation error"})
  
    }else {
      req.token = token;
      next();
    }
  });
}

 
//middleware to verify token
const verifyAdminToken = (req, res, next) => {
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
    req.userId = userInfo.companyEmail;
    next(); // Proceed to the next middleware
  });
};

export {adminToken, verifyAdminToken}