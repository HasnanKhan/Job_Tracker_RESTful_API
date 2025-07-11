const mongoose = require('mongoose');

// Define schema for Job Application
const ApplicationSchema = new mongoose.Schema({
  company: String,
  position: String,
  status: String,
  appliedDate: Date,
  notes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Link to user
});

module.exports = mongoose.model('Application', ApplicationSchema);
