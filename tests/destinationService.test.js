// __tests__/destinationService.test.js
const db = require('../db');
const service = require('../services/destinationService');

jest.mock('../db', () => ({
  query: jest.fn(),
  end: jest.fn() // mock end method to prevent errors
}));

describe('Destination Service - Unit Tests', () => {
  afterEach(() => jest.clearAllMocks());

  test('getAllDestinations - should return all destinations', async () => {
    const mockData = [{ id: 1, place: 'Paris', date_of_visit: '2024-01-01', photos: '' }];
    db.query.mockResolvedValue([mockData]);

    const result = await service.getAllDestinations();
    expect(result).toEqual(mockData);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM destinations');
  });

  test('getDestinationById - should return a destination by id', async () => {
    const mockData = [{ id: 1, place: 'Paris', date_of_visit: '2024-01-01', photos: '' }];
    db.query.mockResolvedValue([mockData]);

    const result = await service.getDestinationById(1);
    expect(result).toEqual(mockData[0]);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM destinations WHERE id = ?', [1]);
  });

  test('addDestination - should add a new destination', async () => {
    db.query.mockResolvedValue([{ insertId: 10 }]);

    const result = await service.addDestination('Paris', '2024-01-01', '');
    expect(result).toBe(10);
    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO destinations (place, date_of_visit, photos) VALUES (?, ?, ?)',
      ['Paris', '2024-01-01', '']
    );
  });
});
