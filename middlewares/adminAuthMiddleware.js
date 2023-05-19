const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSign = process.env.JWT_SECRET;
const { admin } = require("../models/adminModel");


const adminToken = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if the admin  exists
    const user = await admin.findOne({ where: { companyEmail: email } });

    if (user) {
      // admin exists, generate a JWT
        const token = jwt.sign({ adminId: admin.adminId }, jwtSign);
        req.token = token;// Attach the generated token to the request object for future use
        next();
    } else {
      // admin does not exist, prompt them to sign up
      return res.status(401).json({ message: 'Admin does not exist. Please sign up.' });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

//middleware to verify token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSign, (error, decoded) => {
    if (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Token is valid, attach the decoded payload to the request object
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware
  });
};

module.exports = {
  adminToken, verifyAdminToken
}