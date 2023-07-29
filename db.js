const mysql = require('mysql2');

// Create a MySQL connection pool
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Steve461',
  database: 'employee_management',
};

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();
