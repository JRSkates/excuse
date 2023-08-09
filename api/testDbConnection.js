const mongoose = require('mongoose');
require('dotenv').config();

// Set up Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Listen for successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Listen for connection errors
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});
