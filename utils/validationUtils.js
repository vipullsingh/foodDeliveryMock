const Joi = require('joi');

// Validation schema for user registration
const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required()
  }).required()
});

// Validation schema for user login
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Validate user registration data
exports.validateRegistration = (data) => {
  return userRegistrationSchema.validate(data);
};

// Validate user login data
exports.validateLogin = (data) => {
  return userLoginSchema.validate(data);
};
