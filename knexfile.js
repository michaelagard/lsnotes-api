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
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './data/seeds'
    },
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true,
  }
}; 