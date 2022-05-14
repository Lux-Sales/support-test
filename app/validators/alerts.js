const Joi = require('@hapi/joi');

const saveSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(50)
    .required(),
  term: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),
  frequency: Joi
    .number()
    .valid(2, 5, 30)
    .required()
});

const updateSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(50)
    .allow(null, ''),
  term: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .allow(null, ''),
  frequency: Joi
    .number()
    .valid(2, 5, 30)
    .allow(null, ''),
});

module.exports = {
  saveSchema,
  updateSchema
};
