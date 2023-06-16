import Joi from "joi";
const postJobValidator = (req, res, next) => {
    const schema = Joi.object({
        job_title: Joi.string().required().regex(/^[A-Za-z- ]+$/).messages({
            "any.required": "Job title is required!",
            "string.pattern.base": "First name can contain only letters and hyphen(-)!"
        }),
        job_type: Joi.string().required().messages({
            "any.required": "Choose the type of job!",
        }),
        job_description: Joi.string().required().messages({
            "any.required": "PDescribe the job you are posting!"
        }),
        salary_range: Joi.string().required().messages({
            "any.required": "Enter the salary for this job!",
            // "string.pattern.base": "Please enter numbers and $ or ₵"
        }),
        location: Joi.string().required().min(3).max(25).messages({
            "any.required": "Enter the location of this job!",
            "string.min": "Location cannot be less than 10 characters",
            "string.max": "Location cannot be more than 25 characters"
        }),
        requirements: Joi.string().min(3).required().messages({
            "any.required": "Enter the requirements for this job!",
            "string.min": "Requirements cannot be less than 20 characters",
            "string.max": "Requirements cannot be more than 80 characters"
        }),
        application_deadline: Joi.date().required().messages({
            "any.required": "Enter the apllication deadline!"
        }),
        how_to_apply: Joi.string().required().messages({
            "any.required": "Indicate how to apply for this job"
        }),
        name_of_poster: Joi.string().required().messages({
            "any.required": "Enter your full name",
            "string.pattern.base": "Please name can contain only letters and hyphen(-)!"
        }),
        role: Joi.string().required().messages({
            "any.required": "Enter your role or position in the company!",
            "string.pattern.base": "Only letters are allowed"
        }),
        contact: Joi.string().messages({
            "any.required": "Enter your phone number!",
            "string.pattern.base": "Enter a valid phone number!"
        })
    })
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error) {
        const message = error.details.map(x => x.message);
        res.status(400).json({ message });
        return;
    }
    next();
};

export default postJobValidator;