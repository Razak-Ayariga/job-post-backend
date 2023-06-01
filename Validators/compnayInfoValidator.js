import Joi from "joi";

const addCompanyProfile = (req, res, next) => {
  const schema = Joi.object({
    location: Joi.string().required().messages({
      "any.required": "Location is required.",
      "string.empty": "Location cannot be empty.",
    }),
    industry: Joi.string().required().messages({
      "any.required": "Industry is required.",
      "string.empty": "Industry cannot be empty.",
    }),
    description: Joi.string().min(15).max(256).messages({
      "string.min": "Description cannot be less than 15 characters",
      "string.max": "Description cannot be over 256 characters",
    }),
    website: Joi.string()
      .pattern(
        new RegExp("^https?://(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:/\\S*)?$")
      )
      .messages({
        "string.pattern.base":
          "Invalid website URL format! Please provide a valid URL starting with http:// or https://",
        "any.required": "Website is required!",
      }),
    linkedin_link: Joi.string()
      .pattern(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in)\/[a-zA-Z0-9_-]+\/?$/)
      // .allow("")
      .optional()
      .messages({
        "string.pattern.base": "LinkedIn link must be in the correct format.",
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

export default addCompanyProfile;