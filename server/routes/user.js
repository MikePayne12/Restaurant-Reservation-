const express = require('express');
const router = express.Router();
const { storage } = require('../models/sql-storage');
const { authenticateToken, requireAdmin } = require('../utils/auth');

// Validate imports
if (!storage) {
  console.error('Error: Storage object is undefined.');
} else {
  console.log('Storage object loaded:', Object.keys(storage));
}
if (!storage.getUser || !storage.updateUser || !storage.getAllUsers) {
  console.error('Error: One or more storage methods are undefined.');
}

if (!authenticateToken || !requireAdmin) {
  console.error('Error: Authentication middleware is undefined.');
} else {
  console.log('Authentication middleware loaded successfully.');
}

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await storage.getUser(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update current user profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { username, name, email, phone } = req.body;
    
    // Check if username already exists and is not the current user
    if (username) {
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }
    
    // Check if email already exists and is not the current user
    if (email) {
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail && existingEmail.id !== req.user.id) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }
    
    const updatedUser = await storage.updateUser(req.user.id, {
      username,
      name,
      email,
      phone
    });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password
    const { password, ...userData } = updatedUser;
    res.json(userData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    // Don't send passwords
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userData } = user;
      return userData;
    });
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get a specific user (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await storage.getUser(parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a specific user (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, name, email, phone, role } = req.body;
    const userId = parseInt(req.params.id);
    
    // Check if username already exists and is not the current user
    if (username) {
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }
    
    // Check if email already exists and is not the current user
    if (email) {
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail && existingEmail.id !== userId) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }
    
    const updatedUser = await storage.updateUser(userId, {
      username,
      name,
      email,
      phone,
      role
    });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password
    const { password, ...userData } = updatedUser;
    res.json(userData);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;