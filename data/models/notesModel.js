const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(process.env.ENVIRONMENT || knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('notes');
}

function findById(_id) {
  return db('notes')
    .where({ _id })
    .first();
}

function add(note) {
  return db('notes')
    .insert(note)
    .into('notes');
}

function update(_id, changes) {
  return db('notes')
    .where({ _id })
    .update(changes);
}

function remove(_id) {
  return db('notes')
    .where({ _id })
    .del();
}