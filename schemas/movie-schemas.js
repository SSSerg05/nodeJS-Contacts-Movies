import Joi from "joi";

// схема для валідації при додаванні
export const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title must be exit",
    "string.base": "title must be text",
  }), 
  director: Joi.string().required()
})

// схема для валідації при додаванні
export const movieUpdateSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
})