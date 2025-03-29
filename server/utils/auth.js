const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash a password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Verify a password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate a JWT token
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      role: user.role || 'customer'
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1d' }
  );
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Admin role middleware
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
  next();
}

// Set up authentication routes
function setupAuth(app, storage) {
  // Register a new user
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, password, name, email, phone } = req.body;
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      
      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        name,
        email,
        phone,
        role: 'customer'
      });
      
      // Generate token
      const token = generateToken(user);
      
      // Send response with user data (excluding password)
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        ...userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  });
  
  // Login user
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      
      // Verify password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      
      // Generate token
      const token = generateToken(user);
      
      // Send response with user data (excluding password)
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        ...userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  });
  
  // Get current authenticated user
  app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Send response with user data (excluding password)
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Logout user - Just for API completeness, client handles token removal
  app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
  });
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  authenticateToken,
  requireAdmin,
  setupAuth
};