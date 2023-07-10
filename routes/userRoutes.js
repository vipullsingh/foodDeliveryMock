const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validateUserRegistration, validateUserLogin } = require('../utils/validationUtils');

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Validate user registration data
    const { error } = validateUserRegistration(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the email is already registered
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address
    });

    // Save the user to the database
    const savedUser = await user.save();

    res.status(201).json({ userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user login data
    const { error } = validateUserLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

// PUT /api/user/:id/reset
router.put('/user/:id/reset', async (req, res) => {
    try {
      const userId = req.params.id;
      const { currentPassword, newPassword } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Check if the current password is correct
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid current password.' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the user's password
      user.password = hashedPassword;
  
      // Save the updated user to the database
      const savedUser = await user.save();

    //   res.write('Password reset success')
  
      res.status(204).json({ message: 'Password reset successful.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while resetting the password.' });
    }
  });
  
  module.exports = router;
  
