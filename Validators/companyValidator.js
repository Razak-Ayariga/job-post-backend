const Joi = require('joi');

const companyRegisterValidator = (req,res,next) => {
  const schema = Joi.object({
    companyName: Joi.string().min(3).required(),
 
    companyEmail: Joi.string().email({ minDomainSegments: 2 }).required(), 
    password: Joi.string().min(8).regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).required(),
    confirmPassword: Joi.ref('password'),
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot.
     })
     const {companyName, companyEmail, password, confirmPassword} = req.body;
  const {error} = schema.validate({companyName, companyEmail, password, confirmPassword});
  if(error){
    console.log(error);
    return res.status(400).json("invalid entry");
  }
  next(); //is used to validate the data object against the defined schema
};


const companyLogInValidator = (req,res,next) => {
  const schema = Joi.object({
     companyEmail: Joi.string().required(),
    password: Joi.string().required()
  
  })
  .with("email", "password")
  const {companyEmail, password} = req.body;
  const {error} = schema.validate({companyEmail, password})
  if(error)
  res.status(400).json("email and password required");
  return next();
  
};

module.exports = { companyRegisterValidator, companyLogInValidator };