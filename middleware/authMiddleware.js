const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
// const jobSeekersModel = require('../models/jobSeekersModel');


//middleware to check if user exists in the database and generate a JWT
const generateToken = async (req, res, next) => {
    
    const { email, password } = req.body;
   

    // Check if the user exists
    if(!(email && password)){
        res.status(201).json("email and password required!");
        return;
    }

     jwt.sign({email}, jwtSecret, (error,token) => {
         if(error){
            return res.status(400).json("token generation failed")
         } else{
            req.token = token;// Attach the generated token to the request object for future use
            console.log('signed-token',token);
            next();
         }
        })
       };



// verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  console.log(token);

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


module.exports = { generateToken, verifyToken }