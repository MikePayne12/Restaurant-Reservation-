// Update your auth.js file to include these changes

const express = require('express');
const router = express.Router();
const db = require('../db');
const { hashPassword } = require('../utils/auth');
const { generateEmailVerificationToken, generatePasswordResetToken } = require('../utils/tokens');

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
    
    // Note: In a real implementation, you would send an email with the verification token here
    // For now, we'll just return the token in the response for testing purposes
    
    res.status(201).json({ 
      message: 'Registration successful! Please verify your email.',
      userId: newUser.id,
      // Don't include this in production, just for testing:
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
    
    // Note: In a real implementation, you would send an email with the reset token here
    // For now, we'll just return the token in the response for testing purposes
    
    res.status(200).json({ 
      message: 'If your email is registered, you will receive password reset instructions.',
      // Don't include this in production, just for testing:
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
    
    // Note: In a real implementation, you would send an email with the new verification token here
    
    res.status(200).json({ 
      message: 'A new verification email has been sent. Please check your inbox.',
      // Don't include this in production, just for testing:
      verificationToken: token
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error sending verification email' });
  }
});

module.exports = router;