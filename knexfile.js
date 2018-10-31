require('donenv').config();
const logalPg = {
  host: 'localhost',
  database: 'lambda',
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/notes.sqlite3'
    },
    seeds: {
      directory: './data/seeds'
    },
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connetion: dbConneciton,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    }
  }
};