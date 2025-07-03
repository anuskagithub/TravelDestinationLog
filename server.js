/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Travel API
 *   description: API documentation for the Travel Logger project
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:3000
 * paths:
 *   /api/destinations:
 *     get:
 *       summary: Get all destinations
 *       responses:
 *         200:
 *           description: A list of destinations
 *     post:
 *       summary: Add a new destination
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 place:
 *                   type: string
 *                 date_of_visit:
 *                   type: string
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       responses:
 *         200:
 *           description: Destination added successfully
 *   /api/destinations/{id}:
 *     get:
 *       summary: Get a specific destination by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Destination details
 *     put:
 *       summary: Update a destination by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 place:
 *                   type: string
 *                 date_of_visit:
 *                   type: string
 *       responses:
 *         200:
 *           description: Destination updated successfully
 *     delete:
 *       summary: Delete a destination by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Destination deleted successfully
 */

const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel API',
      version: '1.0.0',
      description: 'API documentation for the Travel Logger project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Ensure upload folder exists
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mydb@123',
  database: 'travel_log'
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
app.post('/api/destinations', upload.array('photos'), async (req, res) => {
  try {
    const { place, date_of_visit } = req.body;
    if (!place || !date_of_visit) {
      return res.status(400).json({ message: 'Place and Date of Visit are required' });
    }

    const photoPaths = req.files.map(file => file.filename).join(',');
    await db.query(
      'INSERT INTO destinations (place, date_of_visit, photos) VALUES (?, ?, ?)',
      [place, date_of_visit, photoPaths]
    );

    res.json({ message: 'Destination added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding destination' });
  }
});

app.get('/api/destinations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM destinations ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching destinations' });
  }
});

app.get('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM destinations WHERE id = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ message: 'Destination not found' });

    const destination = rows[0];
    destination.photos = destination.photos ? destination.photos.split(',') : [];
    destination.photos = destination.photos.map(p => `/uploads/${p}`);

    res.json(destination);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching destination' });
  }
});

app.put('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { place, date_of_visit } = req.body;

    if (!place || !date_of_visit) {
      return res.status(400).json({ message: 'Place and Date of Visit are required' });
    }

    await db.query(
      'UPDATE destinations SET place = ?, date_of_visit = ? WHERE id = ?',
      [place, date_of_visit, id]
    );

    res.json({ message: 'Destination updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating destination' });
  }
});

app.delete('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT photos FROM destinations WHERE id = ?', [id]);

    if (rows.length && rows[0].photos) {
      const photos = rows[0].photos.split(',');
      photos.forEach(photo => {
        const photoPath = path.join(__dirname, 'public/uploads', photo);
        if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
      });
    }

    await db.query('DELETE FROM destinations WHERE id = ?', [id]);
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting destination' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


module.exports = app;
