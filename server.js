require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// ✅ Test route to confirm server is running
app.get('/test', (req, res) => {
  res.send('API is working ✅');
});

// Routes
app.use('/auth', authRoutes);
app.use('/applications', applicationRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
