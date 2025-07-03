// __tests__/destinationApiValidation.test.js
const request = require('supertest');
const app = require('../server');

describe('Destination API - Validation and Error Handling', () => {

  test('POST /api/destinations - should fail when place is missing', async () => {
    const res = await request(app)
      .post('/api/destinations')
      .field('place', '') // missing place
      .field('date_of_visit', '2024-05-20');

    expect(res.statusCode).toBe(400); // your server should handle this
    expect(res.body.message).toBe('Place is required');
  });

  test('GET /api/destinations/:id - should return 404 for non-existing id', async () => {
    const res = await request(app).get('/api/destinations/9999'); // Assume this ID does not exist

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Destination not found');
  });

  test('GET /api/destinations/:id - should return 400 for invalid (non-numeric) id', async () => {
    const res = await request(app).get('/api/destinations/abc');

    expect(res.statusCode).toBe(400); // your API should validate this
    expect(res.body.message).toBe('Invalid ID');
  });

  test('PUT /api/destinations/:id - should fail when id is invalid', async () => {
    const res = await request(app)
      .put('/api/destinations/invalid')
      .send({ place: 'Osaka', date_of_visit: '2024-05-21' });

    expect(res.statusCode).toBe(400); // Your API should validate the id
    expect(res.body.message).toBe('Invalid ID');
  });

  test('DELETE /api/destinations/:id - should fail when id is invalid', async () => {
    const res = await request(app)
      .delete('/api/destinations/xyz');

    expect(res.statusCode).toBe(400); // Your API should validate the id
    expect(res.body.message).toBe('Invalid ID');
  });

});
