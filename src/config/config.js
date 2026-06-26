const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const databaseUrl = process.env.DATABASE_URL;

const shared = databaseUrl
  ? {
      url: databaseUrl,
      dialect: 'postgres',
      logging: false,
    }
  : {
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'prova_sistemas',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      dialect: 'postgres',
      logging: false,
    };

module.exports = {
  development: shared,
  test: shared,
  production: shared,
};
