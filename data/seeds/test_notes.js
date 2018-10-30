
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        { _id: 1, tags: 'tag1, tag2', title: 'First Seeded Note', textBody: 'This is the first seeded note.' },
        { _id: 2, tags: 'tag3, tag4', title: 'Second Seeded Note', textBody: 'This is the second seeded note.' },
        { _id: 3, tags: 'tag5, tag6', title: 'Third Seeded Note', textBody: 'This is the third seeded note.' },
      ]);
    });
};
