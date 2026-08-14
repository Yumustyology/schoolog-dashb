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
  state: Joi.string().trim().required().label('State'),
  slug: Joi.string().trim().alphanum().min(3).max(50).required().label('Slug'),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(6).required().label('Password'),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});


export const setSchoolPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().label('Password'),
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});


 export const validateWithJoi = (values: any, loginMethod:"email"|"id", audienceType: string) => {
    const schema = Joi.object({
      identifier:
        loginMethod === 'email'
          ? Joi.string().email({ tlds: false }).required().messages({
              'string.empty': 'Email is required',
              'string.email': 'Invalid email address',
            })
          : Joi.string().required().messages({
              'string.empty': `${audienceType} ID is required`,
            }),
      password: Joi.string().required().messages({
        'string.empty': 'Password is required',
      }),
    });

    const { error } = schema.validate(values, { abortEarly: false });
    const errors: Record<string, string> = {};
    if (error) {
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
    }
    return errors;
  };