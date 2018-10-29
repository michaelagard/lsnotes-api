// require('dotenv').config();
const express = require('express');
const server = express();
server.use(express.json());

// CONFIG: knex settings

const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

// CONFIG: server settings
const serverPort = process.env.PORT || 7100; // server port
const serverName = `lsnotes-api`; // Name of server to display at "/" endpoint 
const projectPullRequest = `https://github.com/michaelagard/lsnotes-api/pull/2`;

// ENDPOINTS
server.get('/', (req, res) => { // sanity check root endpoint
  res.status(200).send(`${serverName} running on port ${serverPort}<br>More information: <a href="${projectPullRequest}">n/a</a>`);
});

module.exports = server;