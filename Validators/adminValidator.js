const joi = require('joi');



const adminSignUp = (req,res,next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    middleName: Joi.string().min(3).allow(''),
    lastName: Joi.string().min(3).required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().valid('Male', 'Female', 'other').required(),
    phoneNumber: Joi.string().required(), // to show that ten digits are required
    password: Joi.string().min(8).regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).required(),
    confirmPassword: Joi.ref('password'),
      companyEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
      role: Joi.string().required()
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot. 
    
  })
  // .with("password", "confirmPassword")
  const {firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,password,confirmPassword, companyEmail, role} = req.body;
  const {error} = schema.validate({firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,password,confirmPassword, companyEmail, role});
  if(error){
    return res.status(400).json("invalid entry");
  }
  next(); //is used to validate the data object against the defined schema
};

const adminSignIn = (req,res,next) => {
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




module.exports = {adminSignIn, adminSignUp}