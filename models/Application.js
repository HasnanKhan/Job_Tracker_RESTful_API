const mongoose = require('mongoose');

// Define schema for Job Application
const ApplicationSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: true,
    trim: true
  },
  position: { 
    type: String, 
    required: true,
    trim: true
  },
  status: { 
    type: String, 
    required: true,
    enum: ['applied', 'interview', 'rejected', 'offer', 'accepted'],
    default: 'applied'
  },
  appliedDate: { 
    type: Date, 
    default: Date.now
  },
  notes: { 
    type: String,
    trim: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', ApplicationSchema);