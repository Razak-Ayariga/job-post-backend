import Joi from "joi";

//super admin login validator
const superAdminLoginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
        .with("email", "password");
    next();
};

const passwordChangeValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),

        password: Joi.string()
            .min(8)
            .required()
            .regex(/^(?=.*[!@#$%^&*])(?=.*[A-Z])/)
            .messages({
                "string.pattern.base":
                    "Password must include at least one special character, lowercase, and uppercase letter!",
                "string.min": "Password must be at least 8 characters!",
                "any.required": "Password is required!",
            }),

        confirm_password: Joi.string()
            .required()
            .equal(Joi.ref("password"))
            .messages({
                "any.only": "Passwords do not match!",
            }),
    })
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error) {
        const message = error.details.map((x) => x.message);
        return res.status(400).json({ message });
    }
    next();
}

export { superAdminLoginValidator, passwordChangeValidator };