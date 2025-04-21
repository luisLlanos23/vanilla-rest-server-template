const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const compression = require('compression');
const minify = require('express-minify');
const config = require('./config/config');
const SwaggerUi = require('swagger-ui-express');
const SwaggerApi = require('./src/openapi');

const app = express();
const api = require('./src/api/routes');

app.set('port', config.SERVER_PORT || 3000);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(minify());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  return next();
});

app.use('/health', returnHealthStatus);
SwaggerApi().then((swaggerSpec) => { app.use('/docs/api', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))});
app.use('/api', api);

const server = http.createServer(app);

server.listen(config.SERVER_PORT, '0.0.0.0', () => {
  console.log(`Express Server Running on Port ${config.SERVER_PORT}`);
});

function returnHealthStatus(_req, res) {
  res.status(200).send('OK').end()
}

module.exports = server;
