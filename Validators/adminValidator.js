import Joi from 'joi';

const adminRegisterValidator = (req,res,next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required().regex(/^[-A-Za-z-]+$/),
    middleName: Joi.string().min(3).allow("").regex(/^[A-Za-z-]+$/),
    lastName: Joi.string().min(3).required().regex(/^[A-Za-z-]+$/),
    gender: Joi.string().valid('Male', 'male','Female', 'female', 'Other').required(),
    companyEmail: Joi.string().email({ minDomainSegments: 2 }).required(), 
    role: Joi.string().required().regex(/^[A-Za-z-]+$/),
    password: Joi.string().min(8).regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).required(),
    confirmPassword: Joi.ref('password'),
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot. 
    
  })
  
  const {firstName, middleName, lastName, gender, companyEmail, role, password, confirmPassword} = req.body;
  const {error} = schema.validate({firstName, middleName, lastName, gender, companyEmail, role, password, confirmPassword});
  if(error){
    console.log(error);
    return res.status(400).json("invalid entry");
  }
  next(); //is used to validate the data object against the defined schema
};


const adminLogInValidator = (req,res,next) => {
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

export { adminRegisterValidator, adminLogInValidator };