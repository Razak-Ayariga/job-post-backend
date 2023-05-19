const jwt = require("jsonwebtoken");
require("dotenv").config();
<<<<<<< .merge_file_NtyusN
const jwtSign = process.env.JWT_SECRET;
const { jobSeekers} = require('../models/jobSeekersModel');



//middleware to check if user exists in the database and generate a JWT
const jobseekerToken = async (req, res, next) => {
    const { email } = req.body;

  try {
    // Check if the jobseeker exists
    const jobseeker = await jobSeekers.findOne({ where: { email_address: email } });

    if (jobseeker) {
      // jobseeker exists, generate a JWT
        const token = jwt.sign({ job_seekerId: jobSeekers.Job_seeker_id }, jwtSign);
        req.token = token;// Attach the generated token to the request object for future use
        next();
    } else {
      // jobseeker does not exist, prompt them to sign up
      return res.status(401).json({ message: 'User does not exist. Please sign up.' });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
=======
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
    

>>>>>>> .merge_file_Hr38td


//middleware to verify token
const verifyJobseekerToken = (req, res, next) => {
<<<<<<< .merge_file_NtyusN
  const token = req.headers.authorization;
=======
  const token = req.headers.token;
>>>>>>> .merge_file_Hr38td

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

<<<<<<< .merge_file_NtyusN
  jwt.verify(token, jwtSign, (error, decoded) => {
=======
  jwt.verify(token, jwtSecret, (error, userInfo) => {
>>>>>>> .merge_file_Hr38td
    if (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

<<<<<<< .merge_file_NtyusN
    // Token is valid, attach the decoded payload to the request object
    req.userId = decoded.userId;
=======
    // Token is valid, attach to the request object
    req.userId = userInfo.email;
>>>>>>> .merge_file_Hr38td
    next(); // Proceed to the next middleware
  });
};


<<<<<<< .merge_file_NtyusN
module.exports = {
    jobseekerToken, verifyJobseekerToken
}
=======
module.exports = { jobseekerToken, verifyJobseekerToken }
>>>>>>> .merge_file_Hr38td
