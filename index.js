const express = require('express');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Express PostgreSQL CRUD API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
