import Joi from "joi";

const JobSeekerProfileValidator = (req,res,next) =>{
    const schema = Joi.object({
        photo: Joi.string(),
        linkedInLink: Joi.string(),
        gitHubLink: Joi.string(),
        cv: Joi.string().required()
    });
const validation = schema.validate(req.body)
const { error } = validation;
if(error){
return res.status(400).json({ error: error.details[0].message });
};
next();
};


export default JobSeekerProfileValidator;