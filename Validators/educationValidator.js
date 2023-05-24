const Joi = require('joi');

const EducationValidator = (req,res,next) => {
    const schema = Joi.object({
      institution_name: Joi.string()
        .min(3)
        .notEmpty()
        .matches(/^[a-zA-Z ]*$/)
        .withMessage("Institution Name required")
        .required(),
      degree: Joi.string()
        .valid("primary", "secondary", "undergraduate", "masters", "docterate")
        .matches(/^[a-zA-Z ]*$/)
        .required(),
      field_of_study: Joi.string()
        .valid()
        .matches(/^[a-zA-Z ]*$/)
        .notEmpty()
        .withMessage("Field Required")
        .required(), // Specify valid field of study values   Start_date: Joi.date().iso().required(),
      start_date: Joi.date().max(Joi.ref("end_date")).required(),
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






module.exports = { EducationValidator};