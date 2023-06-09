import Joi from "joi";

const validateLocation = (req, res, next) => {
  const schema = Joi.object({
    country: Joi.string().required().messages({
      "any.required": "Country is required!",
      "string.empty": "Country is required!",
    }),
    region: Joi.string().required().messages({
      "any.required": "Region is required!",
      "string.empty": "Region is required!",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required!",
      "string.empty": "Address is required!",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

export default validateLocation;
