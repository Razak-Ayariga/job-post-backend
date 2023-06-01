import Joi from "joi";

const jsSocialLinksValidator = (req,res,next) =>{
    const schema = Joi.object({
        linkedIn_link: Joi.string(),
        gitHub_link: Joi.string()
    });
    const validation = schema.validate(req.body)
    const { error } = validation;
    if(error){
    return res.status(400).json({ error: error.details[0].message });
    };
    next();
};

export default jsSocialLinksValidator;