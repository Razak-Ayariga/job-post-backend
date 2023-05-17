const Joi = require('joi');

const signupValidator = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    middleName: Joi.string().min(3).max(10).allow(''),
    lastName: Joi.string().min(3).max(10).required(),
    dateOfBirth: Joi.date().iso().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    phoneNumber: Joi.string().pattern(/^\d{10}$/).required(), // to show that ten digits are required
    hashPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_hashPassword: Joi.ref('hashPassword'),
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot. 
    
  });

  return signupValidator.validate(data); //is used to validate the data object against the defined schema
};


const signinValidator = (data) => {
  const schema = Joi.object({
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot. 
    hashPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  
  });
  //return signinValidator.validate(data); //is used to validate the data object against the defined schema
};

module.exports = { signupValidator, signinValidator };
