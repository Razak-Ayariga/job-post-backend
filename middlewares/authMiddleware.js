const jwt = require("jsonwebtoken");
const { jobSeekers} = require('../models/jobSeekersModel');


const checkUserExists = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await jobSeekers.findOne({ where: { email } });

    if (user) {
      // User exists, generate a JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

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


// // Middleware to validate email
// function validateEmail(req, res, next) {
//   const email = req.body.email;
//   const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (!validEmail.test(email)) {
//     return res.status(400).json({ error: 'You have entered an invalid email address!' });
//   }

//   next();
// }

// const passwordValidator = (req, res, next) => {
//   const { password } = req.body;

//   // Regular expression pattern to match password requirements
//   const passwordPattern = /^(?=.*[0-9@&])[a-zA-Z0-9@&]{8,}$/;

//   if (!passwordPattern.test(password)) {
//     return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least 1 number or special character.' });
//   }

//   next();
// };



module.exports = {
    validateEmail, passwordValidator, checkUserExists
}