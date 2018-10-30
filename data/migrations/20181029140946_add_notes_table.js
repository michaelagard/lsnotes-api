exports.up = function (knex, Promise) {
  return knex.schema.createTable('notes', function (tbl) {
    tbl.increments('_id');
    tbl
      .string('tags', 255)
    tbl
      .string('title', 255)
      .notNullable()
    tbl
      .string('textBody')
      .notNullable()
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};