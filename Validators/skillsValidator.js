import Joi from "joi";

const skillsValidator = (req, res, next) => {
  const schema = Joi.object({
    institution_name: Joi.string()
      .min(3)
      .required()
      .regex(/^[a-zA-Z ]*$/)
      .messages({
        "any.required": "Skills name is required!",
        "string.min": "Skills name cannot be less than 3 letters!",
        "string.pattern.base":
          "Skills name can contain only letters and hyphen(-)!",
      })
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.message.map((x) => x.message);
    res.status(400).json(message);
    return;
  }
  next();
};

export default skillsValidator;
