const pool = require('../db');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required' });
  }
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
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required' });
  }
  try {
    const updatedUser = await pool.query(
      'UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4 RETURNING *',
      [name, email, age, id]
    );
    if (updatedUser.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    if (deletedUser.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
