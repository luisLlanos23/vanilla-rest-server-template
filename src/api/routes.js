const fs = require('fs');
const app = require('express').Router();
const response = require('../middleware/catch');

const apiFolders = fs.readdirSync(__dirname).filter((path) => path !== 'routes.js');

apiFolders.forEach((apiFolder) => {
  const indexPath = require(`./${apiFolder}`);
  const apiPath = `/${apiFolder}`;
  app.use(apiPath, indexPath);
});

app.use('*', (req, res) => {
  res.sendStatus(404).json({
    status: 'fail',
    message: 'Route not found',
  });
});

app.use(response);

module.exports = app;
