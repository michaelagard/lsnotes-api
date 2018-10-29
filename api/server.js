// require('dotenv').config();
const express = require('express');
const server = express();
server.use(express.json());
const notes = require('../data/models/notesModel');

// CONFIG: knex settings
const knex = require('knex');
const knexConfig = require('../data/knexfile');
const db = knex(knexConfig.development);

// CONFIG: server settings
serverPort = process.env.PORT || 7100; // server port
serverName = `lsnotes-api`; // Name of server to display at "/" endpoint 
const projectPullRequest = `https://github.com/michaelagard/lsnotes-api/pull/2`;

// ENDPOINTS
server.get('/', (req, res) => { // sanity check root endpoint
  res.status(200).send(`${serverName} running on port ${serverPort}<br>More information: <a href="${projectPullRequest}">n/a</a>`);
});

server.get('/api/notes', (req, res) => { // get list of notes
  notes
    .find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/notes/:id', (req, res) => { // get note by id
  try {
    res.status(200).json({ message: "success" })
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = server;