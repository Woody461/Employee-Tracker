const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'stevemartin',
  password: '461484',
  database: 'employee_management',
});

module.exports = pool.promise();
