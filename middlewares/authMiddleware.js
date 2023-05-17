const jwt = require("jsonwebtoken");
const jwtSign = process.env.JWT_SECRET;
const { jobSeekers} = require('../models/jobSeekersModel');


const userExists = async (req, res, next) => {
    const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await jobSeekers.findOne({ where: { email } });

    if (user) {
      // User exists, generate a JWT
      const token = jwt.sign({ userId: user.id }, jwtSign);

      // Attach the generated token to the request object for future use
      req.token = token;

      // Proceed to the next middleware
      return next();
    } else {
      // User does not exist, prompt them to sign up
      return res.status(401).json({ message: 'User does not exist. Please sign up.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
    userExists
}