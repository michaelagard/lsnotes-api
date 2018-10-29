const request = require('supertest');
const server = require('../api/server.js');

describe('../api/server.js', () => {

  describe('GET /api/notes', () => {

    it('should return status code 200 if notes exist', async () => {
      const response = await request(server).get(`/api/notes`);
      const expected = 200;
      expect(response.status).toBe(expected);
    });

    it('should return status code 204 if notes do not exist', async () => {
      const response = await request(server).get(`/api/notes`);
      const expected = 204;
      expect(response.status).toBe(expected);
    });
  });
  describe('GET /api/notes/:id', () => {

  });
  describe('POST /api/notes/create', () => {

  });
  describe('PUT /api/notes/edit/:id', () => {

  });
  describe('DELETE /api/notes/delete/:id', () => {

  });
});