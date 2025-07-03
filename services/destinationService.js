// services/destinationService.js
const db = require('../db');

async function getAllDestinations() {
  const [destinations] = await db.query('SELECT * FROM destinations');
  return destinations;
}

async function getDestinationById(id) {
  const [destinations] = await db.query('SELECT * FROM destinations WHERE id = ?', [id]);
  return destinations[0];
}

async function addDestination(place, date_of_visit, photos) {
  const [result] = await db.query(
    'INSERT INTO destinations (place, date_of_visit, photos) VALUES (?, ?, ?)',
    [place, date_of_visit, photos]
  );
  return result.insertId;
}

module.exports = {
  getAllDestinations,
  getDestinationById,
  addDestination,
};
