
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        { id: 1, title: 'First Seeded Note', tags: 'first', textBody: 'This is the first seeded note.' },
        { id: 2, title: 'Second Seeded Note', tags: 'second', textBody: 'This is the second seeded note.' },
        { id: 3, title: 'Third Seeded Note', tags: 'third', textBody: 'This is the third seeded note.' },
      ]);
    });
};
