// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mydb@123',
  database: 'travel_log'
});

module.exports = pool.promise();
