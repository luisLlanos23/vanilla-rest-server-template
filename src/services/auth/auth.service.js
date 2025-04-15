const userModel = require('../../database/models/users/users.ops')
const cryptoUtilities = require('../../utils/crypto')
const secret = require('../../../config/config').SECRET_TOKEN

const crypto = new cryptoUtilities()

module.exports = {
  async registerUser(userData) {
    const { password } = userData
    const hashedPassword = await crypto.encrypt(password)
    const user = await userModel.insert({ ...userData, password: hashedPassword })
    const token = crypto.tokenGenerator({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }, secret)

    await this.setExpirationToken(token)
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token
    }
  },

  async login(userData) {
    const { email, password } = userData
    const user = await userModel.findByEmail(email)

    if (!user) throw new Error('User not found')
    if (!crypto.isCorrectPassword(password, user.password)) throw new Error('Invalid password')

    const token = crypto.tokenGenerator({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }, secret)

    await this.setExpirationToken(token)
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token
    }
  },

  async setExpirationToken(token) {
    const tokenDecoded = crypto.decrypt(token, secret)
    const expirationDate = new Date(tokenDecoded.exp * 1000)
    await userModel.update(
      tokenDecoded.id,
      { tokenExpiration: expirationDate }
    )
  }
}