import Joi from "joi";

// схема для валідації при додаванні
export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name must be exit",
    "string.base": "name must be text",
  }), 
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

// схема для валідації при виправленні
export const contactUpdateSchema = Joi.object({
// схема для валідації
  name: Joi.string(),
  email: Joi.string(), 
  phone: Joi.string(),
})