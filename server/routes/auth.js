const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const sqlStorage = require('../models/sql-storage');

// Configure passport to use local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await sqlStorage.getUserByEmail(email);
      
      // Check if user exists
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      // Authentication successful
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Configure passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await sqlStorage.getUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, is_admin: user.is_admin },
    process.env.JWT_SECRET || 'my-secret-key',
    { expiresIn: '1d' }
  );
};

// Helper function to strip sensitive data from user object
const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
    
    // Check if user already exists
    const existingUser = await sqlStorage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const newUser = await sqlStorage.createUser({
      name,
      email,
      password,
      is_admin: false
    });
    
    // Log in the user
    req.login(newUser, { session: true }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login', error: err.message });
      }
      
      // Generate JWT token
      const token = generateToken(newUser);
      
      // Return user data and token
      return res.status(201).json({
        message: 'User registered successfully',
        user: sanitizeUser(newUser),
        token
      });
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error during login', error: err.message });
    }
    
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    
    req.login(user, { session: true }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login', error: err.message });
      }
      
      // Generate JWT token
      const token = generateToken(user);
      
      // Return user data and token
      return res.status(200).json({
        message: 'Login successful',
        user: sanitizeUser(user),
        token
      });
    });
  })(req, res, next);
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout', error: err.message });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Get current user route
router.get('/me', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  res.status(200).json({
    user: sanitizeUser(req.user)
  });
});

// Authentication middleware that can be used in other routes
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // Check for JWT token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my-secret-key');
      
      // Get user from database
      sqlStorage.getUser(decoded.id)
        .then(user => {
          if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }
          
          req.user = user;
          return next();
        })
        .catch(err => {
          console.error('Error verifying token:', err);
          return res.status(401).json({ message: 'Authentication failed' });
        });
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Authentication required' });
  }
};

// Admin access middleware
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (!req.user.is_admin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  next();
};

// Export the router and middleware
module.exports = router;
module.exports.isAuthenticated = isAuthenticated;
module.exports.isAdmin = isAdmin;