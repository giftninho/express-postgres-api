// Import the PostgreSQL client
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  user: 'postgres',      // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'mydb',          // Replace with your database name
  password: 'Perosky@95', // Replace with your PostgreSQL password
  port: 5433,                // Default PostgreSQL port
});

// Export the pool so it can be used in other files
module.exports = pool;