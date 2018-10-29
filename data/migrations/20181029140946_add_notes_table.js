exports.up = function (knex, Promise) {
  return knex.schema.createTable('notes', function (tbl) {
    tbl.increments('noteId');
    tbl
      .string('title', 255)
      .notNullable()
    tbl
      .string('tags', 255)
      .unique('uq_zoo_name');
    tbl
      .string('textBody')
      .notNullable()
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};