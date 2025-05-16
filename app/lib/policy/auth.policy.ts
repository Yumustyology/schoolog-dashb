import Joi from 'joi';

export const registerSchema = Joi.object({
  schoolName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .label('School Name'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email Address'),
  country: Joi.string().trim().required().label('Country'),
  slug: Joi.string().trim().alphanum().min(3).max(50).required().label('Slug'),
  fullname: Joi.string().trim().min(3).max(100).required().label('Full name'),
  password: Joi.string().min(6).required().label('Password'),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});
