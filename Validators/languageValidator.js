import Joi from "joi";

const languageValidator = (req, res, next) => {
  const schema = Joi.object({
    language: Joi.string()
      .regex(
        /^[\p{L}A-Za-zÁÉÍÓÚÑáéíóúñÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸàâæçéèêëîïôœùûüÿ\u4E00-\u9FFF]+$/u
      )
      .messages({
        "string.pattern.base": "Invalid character entered in language!",
      }),
  });

  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    const message = error.details.map((x) => x.message);
    return res.status(400).json({ message });
    }
    next();
};

export default languageValidator;
