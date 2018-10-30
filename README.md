# lsnotes-api
This api was created to allow lsnotes-frontend to manipulate a sqlite3 database in a way to store simple notes in a card list.

### DB Schema
#### Table 'notes'
* 'tags' - string, max characters 255
* '_id' - incremental integer
* 'title' - string, not nullable, max characters 255
* 'textBody' - string, not nullable
##### Knex Configuration
```
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
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
```
### API Endpoints

### `GET` `/api/notes`

Returns all notes in an array of objects.
```
[
    {
        "_id": 1,
        "tags": "tag1, tag2",
        "title": "First Seeded Note",
        "textBody": "This is the first seeded note."
    },
    {
        "_id": 2,
        "tags": "tag3, tag4",
        "title": "Second Seeded Note",
        "textBody": "This is the second seeded note."
    },
    {
        "_id": 3,
        "tags": "tag5, tag6",
        "title": "Third Seeded Note",
        "textBody": "This is the third seeded note."
    }
]
```
### `GET` `/api/notes/:_id`

Returns one note based off it's _id in an object.
##### Example: `/api/notes/3`
```
{
    "_id": 3,
    "tags": "tag5, tag6",
    "title": "Third Seeded Note",
    "textBody": "This is the third seeded note."
}
```

### `POST` `/api/notes/create`

Used to create new notes. Accepts an object with at least a title and textBody. Also accepts tags, but not implemented. Returns `_id` of new accepted note.
#### Example Object:
```
{
	"tags": "tag7, tag8",
	"title": "Fourth Note",
	"textBody": "This is the fourth note."
}
```
### `PUT` `/api/notes/edit/:_id`

Used to edit an existing note. If passed an `_id` that exists, this endpoint accepts an object title, textBody, and/or tag and will update the note with the corresponding `_id`. This endpoint responds with the number of notes modified.

If no note exists by the `_id` supplied you'll recieve this object:
```
{ message: 'No records found to update' }
```
### `DELETE` `/api/notes/delete/:_id`

Used to delete an existing note. If passed an `_id` that exists, the note with the associated `_id` will be dropped from the database. This endpoint responds with the number of notes deleted.

If no note exists by the `_id` supplied you'll recieve this object:
```
{ message: 'No records found to delete' }
```