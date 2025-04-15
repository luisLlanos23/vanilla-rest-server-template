const Joi = require('@hapi/joi');

module.exports = {
  post_login: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .regex(/@(outlook|hotmail|gmail|yopmail)\.(com|es)$/)
        .required(),
      password: Joi.string().min(4).max(16),
    }).label('body'),
  },

  post_register: {
    body: Joi.object({
      name: Joi.string().min(3).max(30),
      lastName: Joi.string().min(3).max(30),
      email: Joi.string()
        .email()
        .regex(/@(outlook|hotmail|gmail|yopmail)\.(com|es)$/)
        .required(),
      password: Joi.string().min(4).max(16),
      isAdmin: Joi.boolean().optional(),
    }).label('body'),
  },
};
