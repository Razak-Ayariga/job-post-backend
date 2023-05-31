import Joi from "joi";

const jobSeekerInfoValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).regex(/^[A-Za-z- ]+$/).messages({
            "any.required": "First name is required!",
            "string.min": "First name cannot be less than 3 letters!",
            "string.pattern.base": "First name can contain only letters and hyphen(-)!"
        }),
        middle_name: Joi.string().min(3).allow('').regex(/^[A-Za-z- ]+$/).messages({
            "any.required": "Middle name is required!",
            "string.min": "Middle name cannot be less than 3 letters!",
            "string.pattern.base": "Middle name can contain only letters and hyphen(-)!"
        }),
        last_name: Joi.string().min(3).regex(/^[A-Za-z-]+$/).messages({
            "any.required": "Last name is required!",
            "string.min": "Last name cannot be less than 3 letters!",
            "string.pattern.base": "Last name must contain only letters and hyphen(-)!"
        }),
        date_of_birth: Joi.date().iso().messages({
            "date.format": "date format is YYYY-MM-DD"
        }),
        gender: Joi.string().valid('male', 'female', 'other').messages({
            "any.required": "Gender is required!",
            "any.only": "Invalid gender value! Choose Male, Female or other!"
        }),
        lindIn_link: Joi.string(),
        gitHub_link: Joi.string(),
    });
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error) {
        const message = error.details.map(x => x.message);
        return res.status(400).json(message);
    }
    next();
};

export default jobSeekerInfoValidator;