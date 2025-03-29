// C:\Users\Admin\RAUL\server\routes\auth.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Generate JWT token for authentication
function generateAuthToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    is_admin: user.is_admin
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Generate email verification token
function generateEmailVerificationToken() {
  return {
    token: uuidv4(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
}

// Generate password reset token
function generatePasswordResetToken() {
  return {
    token: crypto.randomBytes(32).toString('hex'),
    expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  };
}

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, phone } = req.body;
    
    // Validate input
    if (!username || !email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if username exists
    const usernameCheck = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    // Check if email exists
    const emailCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Generate verification token
    const { token, expires } = generateEmailVerificationToken();
    
    // Insert new user with verification token
    const result = await db.query(
      `INSERT INTO users (
        username, 
        email, 
        password, 
        name, 
        phone, 
        is_admin,
        is_verified,
        verification_token,
        verification_expires
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        username,
        email,
        hashedPassword,
        name,
        phone || null,
        false,
        false,
        token,
        expires
      ]
    );
    
    const newUser = result.rows[0];
    
    // In a real application, you would send an email with a verification link here
    // For development purposes, we'll log the token
    console.log(`[DEV] Verification token for ${email}: ${token}`);
    
    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account.',
      userId: newUser.id,
      // The following line should be removed in production
      verificationToken: token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ message: 'Invalid verification link' });
    }
    
    // Find user with this token
    const result = await db.query(
      'SELECT * FROM users WHERE verification_token = $1',
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid verification link' });
    }
    
    const user = result.rows[0];
    
    // Check if token is expired
    if (new Date() > new Date(user.verification_expires)) {
      return res.status(400).json({ message: 'Verification link has expired' });
    }
    
    // Mark user as verified and clear token
    await db.query(
      'UPDATE users SET is_verified = true, verification_token = NULL, verification_expires = NULL WHERE id = $1',
      [user.id]
    );
    
    res.status(200).json({ message: 'Email verification successful! You can now log in.' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error during email verification' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ message: 'Login and password are required' });
    }
    
    // Check if login is email or username
    const isEmail = login.includes('@');
    
    let query, params;
    if (isEmail) {
      query = 'SELECT * FROM users WHERE email = $1';
      params = [login];
    } else {
      query = 'SELECT * FROM users WHERE username = $1';
      params = [login];
    }
    
    const result = await db.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Check if user is verified
    if (!user.is_verified) {
      return res.status(401).json({ 
        message: 'Please verify your email before logging in',
        needsVerification: true,
        userId: user.id
      });
    }
    
    // Compare password
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = generateAuthToken(user);
    
    // Return user data and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        is_admin: user.is_admin
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if user exists
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      // For security reasons, still return success even if email doesn't exist
      return res.status(200).json({ message: 'If your email is registered, you will receive password reset instructions.' });
    }
    
    const user = result.rows[0];
    
    // Generate reset token
    const { token, expires } = generatePasswordResetToken();
    
    // Update user with reset token
    await db.query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3',
      [token, expires, user.id]
    );
    
    // In a real application, you would send an email with a reset link here
    // For development purposes, we'll log the token
    console.log(`[DEV] Password reset token for ${email}: ${token}`);
    
    res.status(200).json({ 
      message: 'If your email is registered, you will receive password reset instructions.',
      // The following line should be removed in production
      resetToken: token
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error processing your request' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }
    
    // Find user with this token
    const result = await db.query(
      'SELECT * FROM users WHERE reset_password_token = $1',
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    const user = result.rows[0];
    
    // Check if token is expired
    if (new Date() > new Date(user.reset_password_expires)) {
      return res.status(400).json({ message: 'Password reset link has expired' });
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(password);
    
    // Update user password and clear reset token
    await db.query(
      'UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
      [hashedPassword, user.id]
    );
    
    res.status(200).json({ message: 'Password has been reset successfully. You can now log in with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error resetting password' });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Find user by email
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      // For security reasons, still return success
      return res.status(200).json({ message: 'If your email is registered and not verified, a new verification email has been sent.' });
    }
    
    const user = result.rows[0];
    
    // Check if already verified
    if (user.is_verified) {
      return res.status(400).json({ message: 'This account is already verified. Please log in.' });
    }
    
    // Generate new verification token
    const { token, expires } = generateEmailVerificationToken();
    
    // Update user with new token
    await db.query(
      'UPDATE users SET verification_token = $1, verification_expires = $2 WHERE id = $3',
      [token, expires, user.id]
    );
    
    // In a real application, you would send an email with a verification link here
    // For development purposes, we'll log the token
    console.log(`[DEV] New verification token for ${email}: ${token}`);
    
    res.status(200).json({ 
      message: 'A new verification email has been sent. Please check your inbox.',
      // The following line should be removed in production
      verificationToken: token
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error sending verification email' });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, name, phone, is_admin FROM users WHERE id = $1', [req.user.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error getting user data' });
  }
});

module.exports = {
  router,
  authenticateToken
};