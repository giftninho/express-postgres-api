const express = require('express');
const pool = require('./db'); // Import database connection

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * GET /users
 * Fetch all users from the database
 */
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * GET /users/:id
 * Fetch a single user by ID
 */
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * POST /users
 * Create a new user
 */
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * PUT /users/:id
 * Update an existing user
 */
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [name, email, age, id]
    );
    if (updatedUser.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * DELETE /users/:id
 * Delete a user by ID
 */
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (deletedUser.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
