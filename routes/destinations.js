// routes/destinations.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all destinations
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM destinations');
  res.json(rows);
});

// GET one destination by ID
router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM destinations WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// POST a new destination
router.post('/', async (req, res) => {
  const { place, country, description } = req.body;
  await db.query('INSERT INTO destinations (place, country, description) VALUES (?, ?, ?)', [place, country, description]);
  res.json({ message: 'Destination added' });
});

// PUT update a destination
router.put('/:id', async (req, res) => {
  const { place, country, description } = req.body;
  await db.query('UPDATE destinations SET place = ?, country = ?, description = ? WHERE id = ?', [place, country, description, req.params.id]);
  res.json({ message: 'Destination updated' });
});

// DELETE a destination
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM destinations WHERE id = ?', [req.params.id]);
  res.json({ message: 'Destination deleted' });
});

module.exports = router;
