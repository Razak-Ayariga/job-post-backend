import Joi from "joi";
// import companies from "../models/companyModel.js";

//register company validator
const companyRegisterValidator = (req, res, next) => {
  const schema = Joi.object({
    company_name: Joi.string()
      .min(3)
      .regex(/^[-A-Za-z0-9 ]+$/)
      .required()
      .messages({
        "any.required": "Company name is required!",
        "string.min": "Company name cannot be less than three letters!",
        "string.pattern.base":
          "Company name can only contain letters, numbers and a hyphen(-)!"
      }),

    email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
      "string.email":
        "Invalid email format. Please provide a valid email address!",
      "any.required": "Email is required!"
    }),

    password: Joi.string()
      .min(8)
      .required()
      .regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/)
      .messages({
        "string.pattern.base":
          "Password must include at least one special character, lowercase, and uppercase letter!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!"
      }),

    confirm_password: Joi.string()
      .required()
      .equal(Joi.ref("password"))
      .messages({
        "any.only": "Passwords do not match!"
      }),

    mobile_number: Joi.string()
      .required()
      .regex(/^[0-9+]+$/)
      .messages({
        "string.pattern.base":
          "Phone number can contain only numbers and must start with +",
        "string.length": "Phone number must be exactly 13 digits",
        "any.required": "Phone number is required!"
      }),
    verification_method: Joi.string().required().messages({
      "any.only":
        "Verification method must be either 'Registration Certificate' or 'VAT Number'!",
      "any.required": "Verification method is required!"
    }),

    linkedin: Joi.string(),
    website: Joi.string(),
    industry: Joi.string()
  });

  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    return res.status(400).json({ message });
  }
  next();
};

//validate company login
const companyLoginValidator = (req, res, next) => {
  // const storedPassword = companies.password;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).with("email", "password");
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) return res.status(400).json("email or password required");
  // if(password !== storedPassword) return res.status(401).json("Invalid password");
  next();
};

export { companyRegisterValidator, companyLoginValidator };
