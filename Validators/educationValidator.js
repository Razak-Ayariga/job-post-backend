import Joi from 'joi';

const EducationValidator = (req,res,next) => {
    const schema = Joi.object({
      institution_name: Joi.string()
        .min(3)
        .notEmpty()
        .matches(/^[a-zA-Z ]*$/)
        .withMessage({
          "any.required": "Institution name is required!",
          "string.min": "Institution name cannot be less than 3 letters!",
          "string.pattern.base":
          "Institution name can contain only letters and hyphen(-)!",
        })
        .required(),
      degree: Joi.string()
        .valid("primary", "secondary", "undergraduate", "masters", "docterate")
        .matches(/^[a-zA-Z ]*$/)
        .required(),
      field_of_study: Joi.string()
        .valid()
        .matches(/^[a-zA-Z ]*$/)
        .notEmpty()
        .withMessage({
          "string.pattern.base":
            "Password must include at least one special character, lowercase and uppercase!",
          "string.min":
            "Field of Study must be at least primary secondary undergraduate mastersdocterate!",
          "any.required": "Field of Study is required!",
        })
        .required(), // Specify valid field of study values   Start_date: Joi.date().iso().required(),
      start_date: Joi.date()
        .iso()
        .max(Joi.ref("end_date"))
        .required()
        .messages({
          "date.format": "Start date format is YYYY-MM-DD",
          "date.max": "Start date must be less than End date",
        }),
      end_date: Joi.date().greater(Joi.ref("start_date")).required(),
    });
  
  const {institution_name, degree, field_of_study, start_date, end_date} = req.body;
  const {error} = schema.validate({institution_name, degree, field_of_study, start_date, end_date});
  if(error){
    console.log("Validation ERROR", error);
    return res.status(400).json("Invalid entry");
    };
  next(); //is used to validate the data object against the defined schema
};






export default  EducationValidator ;