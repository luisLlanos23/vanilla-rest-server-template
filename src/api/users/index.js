const app = require('express').Router();
const controller = require('./controller');
const endpointValidator = require('../../middleware/endpoint-validator');
const { updateUser } = require('./schema');

app.get('/', endpointValidator(), endpointValidator(null, 'users'), controller.getAll);
app.get('/:id', endpointValidator(), controller.getById);
app.put('/:id', endpointValidator(updateUser), controller.updateUser);
app.delete('/:id', endpointValidator(), controller.deleteUser);
app.patch('/:id/restore', endpointValidator(), controller.enableUser);

module.exports = app;
