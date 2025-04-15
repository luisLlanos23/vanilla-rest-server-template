const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../middleware/endpoint-validator');
const { post_login, post_register } = require('./schema');

app.post('/login', endpointValidator(post_login, 'auth'), controller.login);
app.post('/register', endpointValidator(post_register, 'auth'), controller.register);

module.exports = app;
