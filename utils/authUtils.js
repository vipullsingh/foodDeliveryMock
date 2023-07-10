const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Missing token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Middleware to check if the user is an admin
exports.checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. User is not an admin.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking admin status.' });
  }
};
