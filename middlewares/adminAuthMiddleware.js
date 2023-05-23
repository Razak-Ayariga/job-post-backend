import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
// const { admin } = require("../models/adminModel");


const adminToken = async (req, res, next) => {
try{
    const { companyEmail } = req.body;
    const findUser = await adminModel.findOne({ where: { companyEmail:companyEmail }});
        if(findUser){
              res.status(400).json({ message: "Administrator already exists. Please login!" });
              return;
            };
  //generate token
  jwt.sign( companyEmail, jwtSecret, (error, token) =>{
        if(error){
              res.status(400).json({message: "validation error"})
              }else {
              req.token = token;
              next();
            }
          })
         } 
          catch(error) {
            console.error('Error checking user:', error);
            res.status(500).json({ message: 'Server error' });
        }
      }
//middleware to verify token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Token is valid, attach the decoded payload to the request object
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware
  });
};

export {adminToken, verifyAdminToken}