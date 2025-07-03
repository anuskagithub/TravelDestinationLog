// __tests__/destinationAdditionalValidation.test.js
const request = require('supertest');
const app = require('../server');

describe('Destination API - Additional Validation', () => {

  test('PUT /api/destinations/:id - should fail when place is missing in update', async () => {
    const res = await request(app)
      .put('/api/destinations/1')
      .send({ place: '', date_of_visit: '2024-06-22' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Place is required');
  });

  test('POST /api/destinations - should fail when date_of_visit is missing', async () => {
    const res = await request(app)
      .post('/api/destinations')
      .field('place', 'Tokyo')
      .field('date_of_visit', '');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Date of visit is required');
  });

  test('GET /api/unknown - should return 404 for unsupported routes', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
  });

});
