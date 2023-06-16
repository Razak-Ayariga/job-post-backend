import Joi from "joi";

const jobSeekerRegisterValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string()
      .min(3)
      .regex(/^[A-Za-z-/ ]+$/)
      .required()
      .messages({
        "any.required": "First name is required!",
        "string.min": "First name cannot be less than 3 letters!",
        "string.pattern.base":
          "First name can contain only letters and hyphen(-)!",
      }),
    middle_name: Joi.string()
      .allow("")
      .regex(/^[A-Za-z- ]+$/)
      .messages({
        "string.pattern.base":
          "Middle name can contain only letters and hyphen(-)!",
      }),
    last_name: Joi.string()
      .min(3)
      .regex(/^[A-Za-z-]+$/)
      .required()
      .messages({
        "any.required": "Last name is required!",
        "string.min": "Last name cannot be less than 3 letters!",
        "string.pattern.base":
          "Last name must contain only letters and hyphen(-)!",
      }),
    date_of_birth: Joi.date().iso().required(),
    gender: Joi.string().valid("male", "female", "Others").messages({
      "any.required": "Gender is required!",
      "any.only": "Invalid gender value! Choose Male, Female or other!",
    }),
    phone: Joi.string()
      .regex(/^[0-9+]+$/)
      .min(10)
      .max(15)
      .messages({
        "string.pattern.base": "Invalid phone number format!",
        "string.min": "Phone number must be at least 10 digits",
        "string.max": "Phone number can not exceed 15 digits",
      }),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must include at least one special character, lowercase and uppercase!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!",
      }),
    confirm_password: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "passwords do not match!",
      }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email":
        "invalid email format. Please provide a valid email address!",
      "any.required": "Email is required!",
    }),
    //minDomainSegments: 2: This is an option for the email rule. It specifies that the email domain must have at least two segments separated by a dot.
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    return res.status(400).json({ message });
  }
  next();
};

//validating job seeker login
const jobSeekerLogInValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).with("email", "password");
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) return res.status(400).json("email or password required");
  next();
};

export { jobSeekerRegisterValidator, jobSeekerLogInValidator };
