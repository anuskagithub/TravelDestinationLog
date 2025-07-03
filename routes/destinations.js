// routes/destinations.js
const express = require('express');
const router = express.Router();
const destinationService = require('../services/destinationService');

// GET all destinations
/**
 * @swagger
 * /api/destinations:
 *   get:
 *     summary: Get all destinations
 *     responses:
 *       200:
 *         description: A list of destinations
 */
router.get('/', async (req, res) => {
  try {
    const destinations = await destinationService.getAllDestinations();
    res.json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving destinations' });
  }
});

// GET one destination by ID
/**
 * @swagger
 * /api/destinations/{id}:
 *   get:
 *     summary: Get destination by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: A single destination
 *       404:
 *         description: Destination not found
 */
router.get('/:id', async (req, res) => {
  try {
    const destination = await destinationService.getDestinationById(req.params.id);
    if (destination) {
      res.json(destination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving destination' });
  }
});

// POST a new destination
/**
 * @swagger
 * /api/destinations:
 *   post:
 *     summary: Add a new destination
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - place
 *               - date_of_visit
 *             properties:
 *               place:
 *                 type: string
 *               date_of_visit:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Destination added successfully
 */

router.post('/', async (req, res) => {
  try {
    const { place, country, description } = req.body;
    const newDestinationId = await destinationService.addDestination(place, country, description);
    res.status(201).json({ id: newDestinationId, place, country, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding destination' });
  }
});

// PUT update a destination
/**
 * @swagger
 * /api/destinations/{id}:
 *   put:
 *     summary: Update a destination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               place:
 *                 type: string
 *               date_of_visit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Destination updated
 */

router.put('/:id', async (req, res) => {
  try {
    const { place, country, description } = req.body;
    const result = await destinationService.updateDestination(req.params.id, place, country, description);

    if (result.affectedRows > 0) {
      res.json({ message: 'Destination updated' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating destination' });
  }
});

// DELETE a destination
/**
 * @swagger
 * /api/destinations/{id}:
 *   delete:
 *     summary: Delete a destination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Destination deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await destinationService.deleteDestination(req.params.id);

    if (result.affectedRows > 0) {
      res.json({ message: 'Destination deleted' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting destination' });
  }
});

module.exports = router;
