// Configuration file for the RAUL restaurant reservation application
require('dotenv').config();

// Database configuration based on environment
const getDatabaseConfig = () => {
  return {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432'),
    database: process.env.PG_DATABASE || 'restaurant_reservation',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
    ssl: process.env.PG_SSL === 'true'
  };
};

// Server configuration
const serverConfig = {
  port: parseInt(process.env.PORT || '3001'),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret-key',
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-key'
};

// Export configuration
const config = {
  env: process.env.NODE_ENV || 'development',
  database: getDatabaseConfig(),
  server: serverConfig
};

// Helper to log configuration (without sensitive information)
const logConfig = () => {
  console.log('Environment:', config.env);
  
  console.log('Database:');
  console.log('  - Host:', config.database.host);
  console.log('  - Port:', config.database.port);
  console.log('  - Database:', config.database.database);
  console.log('  - User:', config.database.user);
  console.log('  - SSL:', config.database.ssl);
  
  console.log('Server:');
  console.log('  - Port:', config.server.port);
  console.log('  - Client URL:', config.server.clientUrl);
};

module.exports = {
  config,
  logConfig
};