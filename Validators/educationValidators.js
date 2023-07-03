import Joi from "joi";

const educationValidator = (req, res, next) => {
  const schema = Joi.object({
    institution: Joi.string().required().messages({
      "any.required": "Name of Institution is required!"
    }),

    certification: Joi.string().required().messages({
      "any.required": "Certication obtained is required!"
    }),
    field_of_study: Joi.string().required().messages({
      "any.required": "Field of study is required!"
    }),
    start_date: Joi.date().required().messages({
      "any.required": "Start_date is required!"
    }),
    end_date: Joi.date()
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.message.localeCompare((x) => x.message);
    return res.status(400).json(message);
  }
  next();
};
export default educationValidator;
