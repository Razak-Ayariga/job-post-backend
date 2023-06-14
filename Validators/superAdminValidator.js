import Joi from "joi";

//register super admin validator
const registersuperAdminValidator = (req, res, next) => {  const schema = Joi.object({ email: Joi.string().required(),password: Joi.string.required(),confirm_password: Joi.string().equal(Joi.ref("password"))});
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error){
    message = error.details.map(x => x.message);
    return res.status(400).json({ message });
  }next();
};

//super admin login validator
const superAdminLoginValidator = (req, res, next) => {
  const schema = joi.object({
    email: Joi.string().required(),
    password: Joi.string().required() })
    .with("email", "password");
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: "email and password required!" });}
  next();
};

export { registersuperAdminValidator, superAdminLoginValidator };
