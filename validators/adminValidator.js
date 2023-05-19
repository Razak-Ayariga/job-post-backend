<<<<<<< .merge_file_gJeqGi
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
=======
const Joi = require('joi');

const adminRegisterValidator = (req,res,next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    middleName: Joi.string().min(3).allow(""),
    lastName: Joi.string().min(3).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    companyEmail: Joi.string().email({ minDomainSegments: 2 }).required(), 
    role: Joi.string().required(),
    password: Joi.string().min(8).regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).required(),
    confirmPassword: Joi.ref('password'),
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot. 
    
  })
  
  const {firstName, middleName, lastName, gender, companyEmail, role, password, confirmPassword} = req.body;
  const {error} = schema.validate({firstName, middleName, lastName, gender, companyEmail, role, password, confirmPassword});
  if(error){
    console.log(error);
>>>>>>> .merge_file_qSLABL
    return res.status(400).json("invalid entry");
  }
  next(); //is used to validate the data object against the defined schema
};

<<<<<<< .merge_file_gJeqGi
const adminSignIn = (req,res,next) => {
  const schema = Joi.object({
     email: Joi.string().required(),
=======

const adminLogInValidator = (req,res,next) => {
  const schema = Joi.object({
     companyEmail: Joi.string().required(),
>>>>>>> .merge_file_qSLABL
    password: Joi.string().required()
  
  })
  .with("email", "password")
<<<<<<< .merge_file_gJeqGi
  const {email, password} = req.body;
  const {error} = schema.validate({email, password})
=======
  const {companyEmail, password} = req.body;
  const {error} = schema.validate({companyEmail, password})
>>>>>>> .merge_file_qSLABL
  if(error)
  res.status(400).json("email and password required");
  return next();
  
};

<<<<<<< .merge_file_gJeqGi



module.exports = {adminSignIn, adminSignUp}
=======
module.exports = { adminRegisterValidator, adminLogInValidator };
>>>>>>> .merge_file_qSLABL
