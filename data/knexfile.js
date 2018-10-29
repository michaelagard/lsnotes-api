module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './notes.sqlite3'
    },
    useNullAsDefault: true,
  }
};
