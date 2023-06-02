import Joi from "joi";

const skillsValidator = (req, res, next) => {
  const schema = Joi.object({
    skills_name: Joi.string()
      .min(3)
      .required()
      .messages({
        "any.required": "Skills name is required!",
        "string.min": "Skills name cannot be less than 3 letters!",
        "string.pattern.base":
          "Skills name can contain only letters and hyphen(-)!",
      }),
  }); //.regex(/^[a-zA-Z ]*$/)

  const validation = schema.validate(req.body);
  const { error } = validation;

  if (error) {
    const message = error.details.map((x) => x.message);
    res.status(400).json(message);
    return;
  }

  next();
};

export default skillsValidator;