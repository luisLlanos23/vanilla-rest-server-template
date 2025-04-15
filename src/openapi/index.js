const Path = require('path');
const SwaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Template API Server Documentation',
    version: '1.0.0',
    description: 'Template API Server is a basic server template built with vanilla JavaScript, without using frameworks like Express. It uses only the Node.js http module to handle routes and requests. Ideal for learning or creating simple APIs from scratch.'
  },
  security: [{ JWT: [] }],
  components: {
    securitySchemes: {
      JWT: {
        in: 'header',
        name: 'Authorization',
        type: 'apiKey'
      }
    },
    responses: {
      204: { description: 'No content' },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/exception'
            }
          }
        }
      }
    }
  },
  schemas: {
    exception: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
        error: { type: 'object' }
      }
    }
  }
}

const options = {
  swaggerDefinition,
  apis: [
    Path.resolve(__dirname, '../api/*/controller.js'),
    Path.resolve(__dirname, './components/*.yml'),
  ]
}

module.exports = async function () { return SwaggerJsdoc(options); }