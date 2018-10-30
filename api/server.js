// require('dotenv').config();
const express = require('express');
const server = express();
server.use(express.json());
const notes = require('../data/models/notesModel');
const cors = require('cors');
server.use(cors());

// CONFIG: knex settings
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// ENDPOINTS
server.get('/api/notes', (req, res) => { // get list of notes
  notes
    .find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const note = await notes.findById(_id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'note not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/notes/create', (req, res) => {
  const note = req.body;
  if (note.title && note.textBody) {
    notes
      .add(note)
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(422).json({ message: 'Notes require a title and a body.' })
  }
});

server.put('/api/notes/edit/:_id', (req, res) => {
  const { _id } = req.params;
  const changes = req.body;
  notes
    .update(_id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/notes/delete/:_id', (req, res) => {
  const { _id } = req.params;

  notes
    .remove(_id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;