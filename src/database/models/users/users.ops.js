const connection = require('../../index')

module.exports = {
  insert: async (data) => {
    const result = await connection.models.users.create(data);
    return result.dataValues
  },

  findAll: async () => {
    return await connection.models.users.findAll({
      where: {
        deleted_at: null
      }
    });
  },

  findById: async (id) => {
    return await connection.models.users.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
  },

  findByIdIncludingDeleted: async (id) => {
    return await connection.models.users.findOne({
      where: {
        id
      }
    });
  },

  findByEmail: async (email) => {
    const [result] = await connection.query(
      "SELECT * FROM users WHERE trim(lower(email)) = trim(lower(:email)) AND deleted_at IS NULL",
      {
        replacements: { email },
        type: connection.QueryTypes.SELECT
      }
    );
    return result;
  },

  update: async (id, data) => {
    return connection.models.users.update(data, {
      where: { id }
    })
  }
}