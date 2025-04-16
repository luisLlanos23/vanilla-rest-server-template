module.exports = (ConnectionInterface, DataTypes) => {
  const users = ConnectionInterface.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true
    }
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: false
  })
  return users
}