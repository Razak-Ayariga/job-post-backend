import Joi from 'joi';

const adminRegisterValidator = (req,res,next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required().regex(/^[-A-Za-z-]+$/).messages({
      "any.required": "First name is required!",
      "string.min": "First name cannot be less than three letters!",
      "string.pattern.base": "First name can only be letters and a hyphen(-)!"
    }),
    middleName: Joi.string().min(3).allow("").regex(/^[A-Za-z- ]+$/).messages({
      "any.required": "Middle name is required!",
      "string.min": "Middle name cannot be less than three letters!",
      "string.pattern.base": "Middle name can only be letters and a hyphen(-)!"
    }),
    lastName: Joi.string().min(3).required().regex(/^[A-Za-z-]+$/).messages({
      "any.required": "Last name is required!",
      "string.min": "Last name cannot be less than three letters!",
      "string.pattern.base": "Last name can only be letters and a hyphen(-)!"
    }),
    gender: Joi.string().valid('Male', 'male','Female', 'female', 'Other').required().messages({
      "any.required": "Gender is required!",
      "any.only": "Invalid gender value! Choose Male, Female or other!"
    }),
    companyEmail: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email":"invalid email format. Please provide a valid email address!",
      "any.required": "Email is required!"
    }), 
    role: Joi.string().required().regex(/^[A-Za-z]+$/).messages({
      "any.required": "Role is required!",
      "string.pattern.base": "Enter only letters in Role field"
    }),
    password: Joi.string().min(8).regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).required().messages({
      "string.pattern.base":"Password must include at least one special character, lowercase and uppercase!",
      "string.min": "Password must be at least 8 characters!",
      "any.required": "Password is required!"
    }),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({
      "any.only":"passwords do not match!"
    }),  
  })
  const validation = schema.validate(req.body);
  const {error} = validation;
  if(error){
    const message = error.details.map(x=>x.message);
    return res.status(400).json(message);
  }
  next(); 
};

//validate admin login
const adminLogInValidator = (req,res,next) => {
  const schema = Joi.object({
     companyEmail: Joi.string().required(),
    password: Joi.string().required()
  })
  .with("companyEmail", "password")
  const {companyEmail, password} = req.body;
  const {error} = schema.validate({companyEmail, password})
  if(error)
  res.status(400).json("email and password required");
  return next();
  
};

export { adminRegisterValidator, adminLogInValidator };