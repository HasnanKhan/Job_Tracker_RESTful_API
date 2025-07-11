const mongoose = require('mongoose');

// Define schema for User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Hashed password
});

module.exports = mongoose.model('User', UserSchema);
