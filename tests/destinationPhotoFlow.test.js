// __tests__/destinationPhotoFlow.test.js
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

const UPLOAD_DIR = path.join(__dirname, '../public/uploads');

describe('Destination API – Photo Upload & Cleanup', () => {
  const testFile = path.join(__dirname, 'data/test-photo.jpeg');
  let createdId;

  beforeAll(() => {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  });

  afterAll(() => {
    // clean leftover test images
    fs.readdirSync(UPLOAD_DIR).forEach(file => {
      if (file.includes('test-photo')) {
        fs.unlinkSync(path.join(UPLOAD_DIR, file));
      }
    });
  });

  test('POST with photo uploads successfully', async () => {
    const res = await request(app)
      .post('/api/destinations')
      .attach('photos', testFile)
      .field('place', 'PhotoPlace')
      .field('date_of_visit', '2024-07-01');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Destination added successfully');
  });

  test('GET returns destination with photo paths', async () => {
    // Find entry by place
    const listRes = await request(app).get('/api/destinations');
    const entry = listRes.body.find(d => d.place === 'PhotoPlace');
    expect(entry).toBeDefined();
    createdId = entry.id;

    const res = await request(app).get(`/api/destinations/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.photos)).toBe(true);
    expect(res.body.photos.some(url => url.startsWith('/uploads/'))).toBe(true);
  });

  test('DELETE removes the destination and photo file', async () => {
    const filesBefore = fs.readdirSync(UPLOAD_DIR);

    const res = await request(app).delete(`/api/destinations/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Destination deleted successfully');

    const filesAfter = fs.readdirSync(UPLOAD_DIR);
    expect(filesAfter.length).toBeLessThan(filesBefore.length);
  });
});
