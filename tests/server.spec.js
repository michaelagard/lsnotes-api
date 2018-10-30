const request = require('supertest');
const server = require('../api/server.js');

describe('../api/server.js', () => {

  describe('GET /api/notes', () => {

    it('should return status code 200 if notes exist', async () => {
      const response = await request(server).get(`/api/notes`);
      const expected = 200;
      expect(response.status).toBe(expected);
    });

    it.skip('should return status code 500 if notes do not exist', async () => {
      const response = await request(server).get(`/api/notes/1`);
      const expected = 500;
      expect(response.status).toBe(expected);
    });
  });

  describe('GET /api/notes/:id', () => {

    it('should return status code 200 if notes exist', async () => {
      const response = await request(server).get(`/api/notes`);
      const expected = 200;
      expect(response.status).toBe(expected);
    });

    it('should return status code 404 if note does not exist', async () => {
      const response = await request(server).get(`/api/notes/:thiswontexist`);
      const expected = 404;
      expect(response.status).toBe(expected);
    });
  });

  describe('POST /api/notes/create/:bodyData', () => {

    it('should return status code 200 if notes exist', async () => {
      let bodyData = { title: 'JEST POST TEST', tags: 'JEST, POST', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).post(`/api/notes/create`).send(bodyData);
      const expected = 201;
      expect(response.status).toBe(expected);
    });

    it('should return status code 422 if body does not exist', async () => {
      const response = await request(server).post(`/api/notes/create`).send();
      const expected = 422;
      expect(response.status).toBe(expected);
    });

    it('should return status code 422 if note.title does not exist', async () => {
      let bodyData = { tags: 'JEST, POST', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).post(`/api/notes/create`).send(bodyData);
      const expected = 422;
      expect(response.status).toBe(expected);
    });

    it('should return status code 422 if note.body does not exist', async () => {
      let bodyData = { tags: 'JEST, POST', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).post(`/api/notes/create`).send(bodyData);
      const expected = 422;
      expect(response.status).toBe(expected);
    });

    it('should respond with the id of the new note', async () => {
      let bodyData = { id: 5000000, title: 'JEST POST TEST', tags: 'JEST, POST', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).post(`/api/notes/create`).send(bodyData);
      const responseDelete = await request(server).delete(`/api/notes/delete/5000000`);
      const expected = 5000000;
      expect(response.body).toBe(expected);
      expect(responseDelete.body).toBe(1);
    });
  });

  describe('PUT /api/notes/edit/:id', () => {

    it('should return status code 200 if existing note was edited correctly', async () => {
      let id = 3;
      let bodyData = { title: 'JEST PUT TEST', tags: 'JEST, PUT', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).put(`/api/notes/edit/${id}`).send(bodyData);
      const expected = 200;
      expect(response.status).toBe(expected);
    });

    it('should return status code 404 if note does not exist', async () => {
      let id = 5000000;
      let bodyData = { title: 'JEST PUT TEST', tags: 'JEST, PUT', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).put(`/api/notes/edit/${id}`).send(bodyData);
      const expected = 404;
      expect(response.status).toBe(expected);
    });

    it('should return with count of updated records which is 1', async () => {
      let id = 3;
      let bodyData = { title: 'JEST PUT TEST', tags: 'JEST, PUT', textBody: 'THIS IS A TEST FROM JEST' }
      const response = await request(server).put(`/api/notes/edit/${id}`).send(bodyData);
      const expected = 1;
      expect(response.body).toBe(expected);
    });
  });

  describe('DELETE /api/notes/delete/:id', () => {

    it('should return status code 200 if existing note was deleted correctly', async () => {
      let bodyData = { id: 5000000, title: 'JEST POST TEST', tags: 'JEST, POST', textBody: 'THIS IS A TEST FROM JEST' }
      const postResponse = await request(server).post(`/api/notes/create`).send(bodyData);
      const postExpected = 201;
      expect(postResponse.status).toBe(postExpected);
      let id = 5000000;
      const response = await request(server).delete(`/api/notes/delete/${id}`);
      const expected = 200;
      expect(response.status).toBe(expected);
    });

    it('should return status code 404 if deleted note does note exist', async () => {
      let id = 4;
      const response = await request(server).delete(`/api/notes/delete/${id}`);
      const expected = 404;
      expect(response.status).toBe(expected);
    });

    it('should return with count of deleted records which is 1', async () => {
      let bodyData = { id: 5000000, title: 'JEST POST TEST', tags: 'JEST, POST', textBody: 'THIS IS A TEST FROM JEST' }
      const postResponse = await request(server).post(`/api/notes/create`).send(bodyData);
      const postExpected = 201;
      expect(postResponse.status).toBe(postExpected);
      let id = 5000000;
      const response = await request(server).delete(`/api/notes/delete/${id}`);
      const expected = 1;
      expect(response.body).toBe(expected);
    })

    it('should return with "message: No records found to delete"', async () => {
      let id = 5000000;
      const response = await request(server).delete(`/api/notes/delete/${id}`);
      const expected = { message: 'No records found to delete' };
      expect(response.body).toEqual(expected);
    })
  });
});