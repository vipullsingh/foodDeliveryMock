
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
const { validateRegistration, validateLogin } = require('../utils/validationUtils');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const { error } = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if user already exists with the given email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send the response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if user exists with the given email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send the response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
