const path = require('path')
const envPath = path.join(__dirname, '../.env')
require('dotenv').config({ path: envPath })

const environments = {
  SERVER_PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 4000,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  RUN_MIGRATIONS: process.env.RUN_MIGRATIONS,
  DATABASE_CONNECTION_PARAMS: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS
  }
}

module.exports = environments