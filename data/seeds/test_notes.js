
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        { _id: 1, title: 'First Seeded Note', textBody: 'This is the first seeded note.', __v: 0 },
        { _id: 2, title: 'Second Seeded Note', textBody: 'This is the second seeded note.', __v: 0 },
        { _id: 3, title: 'Third Seeded Note', textBody: 'This is the third seeded note.', __v: 0 },
      ]);
    });
};
