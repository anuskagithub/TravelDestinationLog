// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mydb@123', // Add your password if you have one
  database: 'travel_db',
});

module.exports = pool;
