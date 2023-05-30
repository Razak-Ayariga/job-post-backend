import Joi from 'joi';

const EducationValidator = (req,res,next) => {
    const schema = Joi.object({
      institution_name: Joi.string()
        .min(3)
        .required()
        .regex(/^[a-zA-Z ]*$/)
        .messages({
          "any.required": "Institution name is required!",
          "string.min": "Institution name cannot be less than 3 letters!",
          "string.pattern.base":
            "Institution name can contain only letters and hyphen(-)!",
        })
        .required(),
      degree: Joi.string()
        .valid("primary", "secondary", "undergraduate", "masters", "docterate")
        .regex(/^[a-zA-Z ]*$/)
        .required(),
      field_of_study: Joi.string()
        .min(6)
        //.valid("primary", "secondary", "undergraduate", "masters", "docterate")
        .regex(/^[a-zA-Z ]*$/)
        .required()
        .messages({
          "string.pattern.base":
            "Field of Study can contain only letters and spaces!",
          "any.required": "Field of Study is required!",
        })
        .required(), // Specify valid field of study values   Start_date: Joi.date().iso().required(),
      start_date: Joi.date().iso().required().messages({
        "date.format": "Start date format is YYYY-MM-DD",
        "date.max": "Start date must be less than End date",
      }),
      end_date: Joi.date().required(),
    });
  
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error) {
      const message = error.details.map((x) => x.message);
      return res.status(400).json({ message });
    }
    next(); 
  
  };
  // const {institution_name, degree, field_of_study, start_date, end_date} = req.body;
  // const {error} = schema.validate({institution_name, degree, field_of_study, start_date, end_date});
  // if(error){
  //   console.log("Validation ERROR", error);
  //   return res.status(400).json("Invalid entry");
  // };
  // next(); //is used to validate the data object against the defined schema
  
  export default  EducationValidator ;

