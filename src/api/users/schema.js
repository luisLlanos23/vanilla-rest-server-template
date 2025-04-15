const Joi = require('@hapi/joi');

module.exports = {
  updateUser: {
    params: Joi.object({
      id: Joi.string().required().description('The ID of the user to update'),
    }).label('params'),

    body: Joi.object({
      name: Joi.string().optional().description('The name of the user'),
      lastName: Joi.string().optional().description('The name of the user'),
      isAdmin: Joi.boolean().optional().description('The name of the user'),
    }).label('body'),
  }
}