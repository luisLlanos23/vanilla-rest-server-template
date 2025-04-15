const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

class cryptoUtilities {

  async encrypt(password) {
    return await bcrypt.hash(password, 15);
  }

  decrypt(token, secret) {
    return jwt.decode(token, secret);
  }

  tokenGenerator(data, secret) {
    const payload = {
      ...data,
      iat: moment().unix(),
      exp: moment().add(1, 'days').unix()
    }
    return jwt.encode(payload, secret)
  }

  isCorrectPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = cryptoUtilities;