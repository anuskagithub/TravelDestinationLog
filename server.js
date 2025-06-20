const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  password: 'mydb@123', // Change if you have a password
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

// Create
app.post('/api/destinations', upload.array('photos'), async (req, res) => {
  try {
    const { place, date_of_visit } = req.body;
    const photoPaths = req.files.map(file => file.filename).join(',');

    await db.query(
      'INSERT INTO destinations (place, date_of_visit, photos) VALUES (?, ?, ?)',
      [place, date_of_visit, photoPaths]
    );

    res.json({ message: 'Destination added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding destination' });
  }
});

// Read all
app.get('/api/destinations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM destinations ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching destinations' });
  }
});

// Read one with gallery
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM destinations WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const destination = rows[0];
    destination.photos = destination.photos ? destination.photos.split(',') : [];
    destination.photos = destination.photos.map(p => `/uploads/${p}`);

    res.json(destination);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching destination' });
  }
});

// Update
app.put('/api/destinations/:id', express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const { place, date_of_visit } = req.body;

    await db.query(
      'UPDATE destinations SET place = ?, date_of_visit = ? WHERE id = ?',
      [place, date_of_visit, id]
    );

    res.json({ message: 'Destination updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating destination' });
  }
});

// Delete
app.delete('/api/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: delete images from disk
    const [rows] = await db.query('SELECT photos FROM destinations WHERE id = ?', [id]);
    if (rows.length && rows[0].photos) {
      const photos = rows[0].photos.split(',');
      photos.forEach(photo => {
        const photoPath = path.join(__dirname, 'public/uploads', photo);
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      });
    }

    await db.query('DELETE FROM destinations WHERE id = ?', [id]);

    res.json({ message: 'Destination deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting destination' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
