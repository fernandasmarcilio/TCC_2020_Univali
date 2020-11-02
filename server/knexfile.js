require("dotenv").config();
const path = require('path');

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
          filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
        },
        migrations: {
          directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        useNullAsDefault: true
      },
    
      production: {
        client: 'pg',
        debug: true,
        connection: process.env.DATABASE_URL,
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        ssl: true
      }
}