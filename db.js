require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test connection
pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL successfully!");
    client.release();
  })
  .catch(err => {
    console.error("Error connecting to PostgreSQL:", err.message);
  });

module.exports = pool;
