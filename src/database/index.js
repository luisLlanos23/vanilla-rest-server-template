const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { DATABASE_CONNECTION_PARAMS: dbConfig, RUN_MIGRATIONS } = require('../../config/config.js');

const { database, username, password, ...connectionOptions } = dbConfig;
const sequelize = new Sequelize(database, username, password, connectionOptions);

const db = {};

if (RUN_MIGRATIONS === 'true') {
  sequelize.sync({ force: false, alter: true })
    .then(() => console.log('Tables created successfully.'))
    .catch((err) => console.error('Error creating tables:', err));
}

const modelsDir = path.join(__dirname, 'models');
fs.readdirSync(modelsDir)
  .filter((folder) => fs.statSync(path.join(modelsDir, folder)).isDirectory())
  .forEach((folder) => {
    const folderPath = path.join(modelsDir, folder);
    fs.readdirSync(folderPath)
      .filter((file) => file.endsWith('.model.js'))
      .forEach((file) => {
        const model = require(path.join(folderPath, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });
  });

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = sequelize;
