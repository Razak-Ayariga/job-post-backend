import Joi from "joi";

const validatorRegistration = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email":
                "invalid email format. Please provide a valid email address!",
      "any.required": "Email is required!"
    }),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/)
      .required()
      .messages({
        "string.pattern.base":
                    "Password must include at least one special character, lowercase and uppercase!",
        "string.min": "Password must be at least 8 characters!",
        "any.required": "Password is required!"
      }),
    confirm_password: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "passwords do not match!"
      })
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    return res.status(400).json({ message });
  }
  next();
};

//validate JobSeeker login
const ValidateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).with("email", "password");
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) return res.status(400).json("email or password required");
  next();
};

export { validatorRegistration, ValidateLogin };
