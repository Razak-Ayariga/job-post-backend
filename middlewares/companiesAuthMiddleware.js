const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


//middleware to generate company jwt
const companyToken = async (req, res, next) => {
  const { companyEmail } = req.body;
    console.log(companyEmail);
    
  // generate token for company
  jwt.sign( companyEmail, jwtSecret, (error, token) =>{
    if(error){
      res.status(400).json({message: "validation error"})
  
    }else {
      req.token = token;
      console.log(token);
      next();
    }
  });
}

//middleware to verify token
const verifyCompanyToken = (req, res, next) => {
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

module.exports = { companyToken, verifyCompanyToken };