import Joi from "joi";

const companyRegisterValidator = (req, res, next) => {
  const schema = Joi.object({
    company_name: Joi.string().min(3).regex(/^[-A-Za-z0-9 ]+$/).required().messages({
        "any.required": "Company name is required!",
        "string.min": "Company name cannot be less than three letters!",
        "string.pattern.base": "Company name can only contain letters, numbers and a hyphen(-)!",
      }),

    company_email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
        "string.email":
          "Invalid email format. Please provide a valid email address!",
        "any.required": "Email is required!",
      }),

    password: Joi.string().min(8).required().regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/).messages({
        "string.pattern.base":
          "Password must include at least one special character, lowercase, and uppercase letter!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!",
      }),

    confirm_password: Joi.string().required().equal(Joi.ref("password")).messages({
        "any.only": "Passwords do not match!",
      }),

    mobile_number: Joi.string().required().regex(/^[0-9+]+$/).messages({
        "string.pattern.base": "Phone number can contain only numbers and must start with +",
        "string.length": "Phone number must be exactly 13 digits",
        "any.required": "Phone number is required!",
      }),
    website: Joi.string().pattern(
        new RegExp("^https?://(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:/\\S*)?$"))
      .messages({
        "string.pattern.base":"Invalid website URL format! Please provide a valid URL starting with http:// or https://",
        "any.required": "Website is required!",
      }),

    region: Joi.string().min(2).required().regex(/^[A-Za-z- ]+$/).messages({
      "any.required": "Region is required!",
      "string.pattern.base": "Region name can only letters and hyphen(-)",
      "string.min": "Region name cannot be less than two letters"
    }),

    town: Joi.string().min(2).required().regex(/^[A-Za-z- ]+$/).messages({
      "any.required": "Town is required!",
      "string.pattern.base": "Town name can only letters and hyphen(-)",
      "string.min": "Town name cannot be less than two letters"
    }),

    description: Joi.string().required().min(15).max(100).messages({
      "any.required": "Description is required!",
      "string.min": "Description cannot be less than 15 characters",
      "string.max": "Description cannot be over 100 characters"
    }),
  });

  const validation = schema.validate(req.body);
  const {error} = validation;
  if(error){
   const message = error.details.map(x=>x.message);
   return res.status(400).json({message});
  }
  next(); 
};

//validate company login
const companyLoginValidator = (req,res,next) => {
  const schema = Joi.object({
    company_email: Joi.string().required(),
    password: Joi.string().required()
  })
    .with("company_email", "password");
  const {company_email, password } = req.body;
  const {error} = schema.validate({company_email, password});
  if (error) {
    return res.status(400).json({message:"email and password required"});
  }
next();
};

export { companyRegisterValidator, companyLoginValidator };