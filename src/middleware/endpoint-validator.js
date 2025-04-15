const ValidationErrors = require('../utils/validation.error');
const CryptoUtilities = require('../utils/crypto')
const tokenSecret = require('../../config/config').SECRET_TOKEN
const userModel = require('../database/models/users/users.model')

module.exports = (schemas, excludeAuthPath) => {
  const validationOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  return async (req, res, next) => {
    if (req.baseUrl.includes(excludeAuthPath)) return next();

    try {
      const token = req.headers['authorization'];
      if (!token) throw ValidationErrors.invalidFields('Token is required', 'headers');

      const decoded = new CryptoUtilities().decrypt(token, tokenSecret);
      if (!decoded) throw ValidationErrors.invalidFields('Invalid token', 'headers');
      tokenValidation(token);
      req.user = decoded;
    } catch (err) {
      return next(err);
    }

    if (schemas) {
      for (const [source, schema] of Object.entries(schemas)) {
        if (schema) {
          const { error, value } = schema.validate(req[source], validationOptions);
          if (error) {
            return next(ValidationErrors.invalidFields(
              error.details.map(({ message }) => message).join('; '),
              source
            ));
          }
          req[source] = value;
        }
      }
    }

    return next();
  };
};

function tokenValidation(token) {
  try {
    const tokenDecoded = new CryptoUtilities().decrypt(token, tokenSecret);
    if (!tokenDecoded) return next(ValidationErrors.invalidFields('Invalid token', 'headers'));
    if (tokenDecoded.exp < moment().unix()) return next(ValidationErrors.invalidFields('Token expired', 'headers'));
  } catch (error) {
    return false;
  }
}