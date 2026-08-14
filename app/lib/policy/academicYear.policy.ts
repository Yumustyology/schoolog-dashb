import Joi from 'joi';

export const academicYearValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Academic session name is required',
    'any.required': 'Academic session name is required',
  }),
  startDate: Joi.string().required().messages({
    'string.empty': 'Start date is required',
    'any.required': 'Start date is required',
  }),
  endDate: Joi.string().required().custom((value, helpers) => {
    const { startDate } = helpers.state.ancestors[0];
    if (!startDate || !value) return value;
    if (new Date(value) <= new Date(startDate)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'End date after start date').messages({
    'string.empty': 'End date is required',
    'any.required': 'End date is required',
    'any.invalid': 'End date must be after start date',
  }),
  isActive: Joi.boolean().optional(),
  terms: Joi.array().items(
    Joi.object({
      id: Joi.number().optional(), // Add this line
      name: Joi.string().required().messages({
        'string.empty': 'Term name is required',
        'any.required': 'Term name is required',
      }),
      startDate: Joi.string().required().messages({
        'string.empty': 'Term start date is required',
        'any.required': 'Term start date is required',
      }),
      endDate: Joi.string().required().custom((value, helpers) => {
        const { startDate } = helpers.state.ancestors[0];
        if (!startDate || !value) return value;
        if (new Date(value) <= new Date(startDate)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'End date after start date').messages({
        'string.empty': 'Term end date is required',
        'any.required': 'Term end date is required',
        'any.invalid': 'End date must be after start date',
      }),
      isActive: Joi.boolean().optional(),
      holidays: Joi.array().items(
        Joi.object({
          id: Joi.any().optional(), // Changed to optional
          name: Joi.string().allow('').optional(),
          date: Joi.string().allow('').optional(),
          type: Joi.string().valid('school', 'public').optional(),
        })
      ).optional(),
    })
  ).min(1).messages({
    'array.min': 'At least one term is required',
  }),
});