const express = require('express');
const auth = require('../middleware/authMiddleware');
const Application = require('../models/Application');

const router = express.Router();

// Create a new job application
router.post('/', auth, async (req, res) => {
  const app = new Application({ ...req.body, userId: req.user }); // Attach user ID
  await app.save();
  res.json(app);
});

// Get all job applications for the logged-in user
router.get('/', auth, async (req, res) => {
  const apps = await Application.find({ userId: req.user });
  res.json(apps);
});

// Get a specific application by ID (only if it belongs to the user)
router.get('/:id', auth, async (req, res) => {
  const app = await Application.findOne({ _id: req.params.id, userId: req.user });
  if (!app) return res.status(404).json({ msg: 'Application not found' });
  res.json(app);
});

// Update a specific application (only if it belongs to the user)
router.put('/:id', auth, async (req, res) => {
  const app = await Application.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    req.body,
    { new: true }
  );
  if (!app) return res.status(404).json({ msg: 'Application not found' });
  res.json(app);
});

// Delete a specific application (only if it belongs to the user)
router.delete('/:id', auth, async (req, res) => {
  const app = await Application.findOneAndDelete({ _id: req.params.id, userId: req.user });
  if (!app) return res.status(404).json({ msg: 'Application not found' });
  res.json({ msg: 'Deleted successfully' });
});

module.exports = router;
