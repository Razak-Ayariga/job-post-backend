import Joi from "joi";

const ProfileValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3)
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
    date_of_birth: Joi.date().required(),
    gender: Joi.string().valid("male","Male", "Female", "female", "Others").messages({
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
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    return res.status(400).json({ message });
  }
  next();
};

export default ProfileValidator;
