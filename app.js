require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Test Database Connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.log('Error: ' + err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
