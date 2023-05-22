const Joi = require('joi');

const EducationValidator = (req,res,next) => {
    const schema = Joi.object({
        Institution_name: Joi.string().min(3).required(),
        Degree: Joi.string().valid('primary', 'secondary', 'undergraduate', 'graduate', 'postgraduate', 'Phd').required(),
        Field_of_study: Joi.string().valid('math', 'science', 'history', 'literature', 'Computer Science', 'Software Development').required(), // Specify valid field of study values   Start_date: Joi.date().iso().required(),
        End_date: Joi.date().iso().greater(Joi.ref('Start_date')).required(),
    
    });
  
  const {Institution_name, Degree, Field_of_study, Start_date, End_date} = req.body;
  const {error} = schema.validate({Institution_name, Degree, Field_of_study, Start_date, End_date});
  if(error){
    console.log(error);
    return res.status(400).json("Invalid entry");
    };
  next(); //is used to validate the data object against the defined schema
};






module.exports = { EducationValidator};