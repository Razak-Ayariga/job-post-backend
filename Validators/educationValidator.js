import Joi from 'joi';

const EducationValidator = (req,res,next) => {
    const schema = Joi.object({
      institution_name: Joi.string().min(3).required().regex(/^[a-zA-Z ]*$/).messages({
          "any.required": "Institution name is required!",
          "string.min": "Institution name cannot be less than 3 letters!",
          "string.pattern.base":
          "Institution name can contain only letters and hyphen(-)!",
        }),
      certification: Joi.string().valid("primary", "secondary", "undergraduate", "masters", "docterate")
        .regex(/^[a-zA-Z ]*$/).required(),
      
        field_of_study: Joi.string().valid().regex(/^[a-zA-Z ]*$/).required().messages({
          "string.pattern.base":"Password must include at least one special character, lowercase and uppercase!",
          "string.min":"Field of Study must be at least primary secondary undergraduate mastersdocterate!",
          "any.required": "Field of Study is required!",
        }), // Specify valid field of study values   Start_date: Joi.date().iso().required(),
      
        start_date: Joi.date().iso().required().messages({
          "date.format": "Start date format is YYYY-MM-DD",
          "date.max": "Start date must be less than End date",
        }),
     
        end_date: Joi.date().required(),
    });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.message.map(x => x.message);
    res.status(400).json(message);
    return;
  }
  next();
};

export default  EducationValidator ;