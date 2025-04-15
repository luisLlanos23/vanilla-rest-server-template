const path = require('path');
const joiErrors = require('./error/joi.error');

module.exports = (req, res, next) => {
  try {
    const schemaPath = path.resolve(__dirname, `..${req.baseUrl}/schema`);
    const routeSchemas = require(schemaPath);
    const urlSrchem = req.url.match(/(?:\/)([a-zA-Z_]{1,})(?:\??)/)[1];
    const pathSchema = `${req.method.toLowerCase()}_${urlSrchem}`;

    if (routeSchemas[pathSchema].headers) {
      const headersValidation = routeSchemas[pathSchema].headers.validate(req.headers);
      if (headersValidation.error) { throw joiErrors.invalidFields(headersValidation.error, 'headers'); }
    }

    if (routeSchemas[pathSchema].params) {
      const paramsValidation = routeSchemas[pathSchema].params.validate(req.params);
      if (paramsValidation.error) { throw joiErrors.invalidFields(paramsValidation.error, 'params'); }
    }

    if (routeSchemas[pathSchema].query) {
      const queryValidation = routeSchemas[pathSchema].query.validate(req.query);
      if (queryValidation.error) { throw joiErrors.invalidFields(queryValidation.error, 'query'); }
    } else if (Object.entries(req.query).length) {
      throw joiErrors.unevaluatedFields('query');
    }

    if (routeSchemas[pathSchema].body) {
      const bodyValidation = routeSchemas[pathSchema].body.validate(req.body);
      if (bodyValidation.error) { throw joiErrors.invalidFields(bodyValidation.error, 'body'); }
    } else if (Object.entries(req.body).length) {
      throw joiErrors.unevaluatedFields('body');
    }

    next();
    return {};
  } catch (error) {
    return next({ error });
  }
};
