exports.up = function (knex, Promise) {
  return knex.schema.createTable('notes', function (tbl) {
    tbl
      .string('tags', 255)
    tbl.increments('_id');
    tbl
      .string('title', 255)
      .notNullable()
    tbl
      .string('textBody')
      .notNullable()
    tbl
      .integer('__v')
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};