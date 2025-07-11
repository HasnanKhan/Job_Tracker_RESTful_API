const express = require('express');
const auth = require('../middleware/authMiddleware');
const Application = require('../models/Application');

const router = express.Router();

// Create a new job application
router.post('/', auth, async (req, res) => {
  try {
    const app = new Application({ ...req.body, userId: req.user });
    await app.save();
    res.status(201).json(app);
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all job applications for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user });
    res.json(apps);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a specific application by ID (only if it belongs to the user)
router.get('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findOne({ _id: req.params.id, userId: req.user });
    if (!app) return res.status(404).json({ msg: 'Application not found' });
    res.json(app);
  } catch (err) {
    console.error('Error fetching application:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a specific application (only if it belongs to the user)
router.put('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    if (!app) return res.status(404).json({ msg: 'Application not found' });
    res.json(app);
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a specific application (only if it belongs to the user)
router.delete('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!app) return res.status(404).json({ msg: 'Application not found' });
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;