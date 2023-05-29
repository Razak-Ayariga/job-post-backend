import Joi from "joi";

const addExperienceValidator = (req, res, next) => {
    const schema = Joi.object({
        company_name: Joi.string().required().messages({
            "any.required": "company name is required!"
        }),
        role: Joi.string().required().messages({
            "any.required": "Role is required!"
        }),
        start_date: Joi.date().required().messages({
            "date.format": "Date format is YYYY - MM -DD"
        }),
        end_date: Joi.string().required().messages({
            "date.format": "Date format is YYYY-MM-DD"
        })
    })
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error) {
        const message = error.message.map(x => x.message);
        return res.status(400).json(message);
    }
    next();
};

export default addExperienceValidator;