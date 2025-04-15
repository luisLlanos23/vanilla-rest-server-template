const userModel = require('../../database/models/users/users.ops')

module.exports = {
  async findAllUsers() {
    const users = await userModel.findAll()
    return users.map(user => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin
    }))
  },
  async findUserById(id) {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      tokenExpiration: user.tokenExpiration
    }
  },

  async updateUser(id, data) {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    const result = await userModel.update(id, data)
    if (!result) throw new Error('Error updating user')
    return { message: 'User updated successfully' }
  },

  async deleteUser(id, tokenDecoded) {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    if (tokenDecoded.id !== user.id && !tokenDecoded.isAdmin) throw new Error('Unauthorized action')
    const result = await userModel.update(id, { deleted_at: new Date() })
    if (!result) throw new Error('Error deleting user')
    return { message: 'User deleted successfully' }
  },

  async enableUser(id, tokenDecoded) {
    const user = await userModel.findByIdIncludingDeleted(id)
    if (!user) throw new Error('User not found')
    if (tokenDecoded.id !== user.id && !tokenDecoded.isAdmin) throw new Error('Unauthorized action')
    const result = await userModel.update(id, { deleted_at: null })
    if (!result) throw new Error('Error enabling user')
    return { message: 'User enabled successfully' }
  }
}