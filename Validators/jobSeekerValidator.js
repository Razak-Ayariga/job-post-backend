const Joi = require('joi');

const jobSeekerRegisterValidator = (req,res,next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    middleName: Joi.string().min(3).allow(''),
    lastName: Joi.string().min(3).required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().valid('Male', 'Female', 'other').required(),
    phoneNumber: Joi.string(),
    password: Joi.string().min(8).regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).required(),
    confirmPassword: Joi.ref('password'),
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot. 
    
  })
  
  const {firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,password,confirmPassword, email} = req.body;
  const {error} = schema.validate({firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,password,confirmPassword, email});
  if(error){
    return res.status(400).json("invalid entry");
  }
  next(); //is used to validate the data object against the defined schema
};


const jobSeekerLogInValidator = (req,res,next) => {
  const schema = Joi.object({
     email: Joi.string().required(),
    password: Joi.string().required()
  
  })
  .with("email", "password")
  const {email, password} = req.body;
  const {error} = schema.validate({email, password})
  if(error)
  res.status(400).json("email and password required");
  return next();
  
};

module.exports = { jobSeekerRegisterValidator, jobSeekerLogInValidator };