import Joi from "joi";
const companyRegistrationValidator = (req, res, next) => {
  const schema = Joi.object({
    registration_number: Joi.string().required().messages({
      "any.required": "Company registration number is required!"
    }),
    vat_number: Joi.string().messages({
      "any.required": "VAT number is required!"
    })
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    res.status(400).json(message);
  }
  next();
};

export default companyRegistrationValidator;
