// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// @route   POST /auth/register
// @desc    Register a new user and return JWT
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ msg: 'Missing username or password' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user to the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with the token
    res.status(201).json({ token });
  } catch (err) {
    console.error('❌ Error during registration:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /auth/login
// @desc    Authenticate user and return JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ msg: 'Missing username or password' });
  }

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with the token
    res.status(200).json({ token });
  } catch (err) {
    console.error('❌ Error during login:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
