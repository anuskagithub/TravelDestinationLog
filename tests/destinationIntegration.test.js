// __tests__/destinationIntegration.test.js
const request = require('supertest');
const app = require('../server'); // your Express app
const db = require('../db');

describe('Destination API - Integration Tests', () => {

  afterAll(async () => {
    await db.end();
  });

  test('POST /api/destinations - should create a destination', async () => {
    const res = await request(app)
      .post('/api/destinations')
      .field('place', 'Tokyo')
      .field('date_of_visit', '2024-05-20');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Destination added successfully');
  });

  test('GET /api/destinations - should return all destinations', async () => {
    const res = await request(app).get('/api/destinations');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/destinations/:id - should update a destination', async () => {
    const res = await request(app)
      .put('/api/destinations/1')
      .send({ place: 'Kyoto', date_of_visit: '2024-05-21' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Destination updated successfully');
  });

  test('DELETE /api/destinations/:id - should delete a destination', async () => {
    const res = await request(app).delete('/api/destinations/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Destination deleted successfully');
  });
});
