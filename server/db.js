require('dotenv').config();
const { Pool } = require('pg');

// PostgreSQL connection configuration
const pgConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'restaurant_reservation',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
};

// Create a new PostgreSQL connection pool
const pool = new Pool(pgConfig);

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected successfully');
  }
});

// SQL query executor
async function query(text, params) {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`[SQL] Query executed in ${duration}ms: ${text.substring(0, 80)}${text.length > 80 ? '...' : ''}`);
    return res;
  } catch (err) {
    console.error('[SQL] Error executing query:', err.message);
    throw err;
  }
}

// Transaction helper
async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// Initialize database and create tables if they don't exist
async function initializeDatabase() {
  try {
    // Create users table
    await query(`
    
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    verification_expires TIMESTAMP,
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
      )
    `);

    // Create restaurants table
    await query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(100),
        opening_time TIME NOT NULL,
        closing_time TIME NOT NULL,
        cuisine_type VARCHAR(50),
        price_range VARCHAR(10),
        image_url TEXT,
        features TEXT[],
        rating NUMERIC(2,1),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `); 

    // Create tables table (for restaurant tables)
    await query(`
      CREATE TABLE IF NOT EXISTS tables (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id),
        table_number VARCHAR(20) NOT NULL,
        capacity INTEGER NOT NULL,
        location VARCHAR(50),
        status VARCHAR(20) DEFAULT 'available'
      )
    `);

    // Create reservations table
    await query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER REFERENCES restaurants(id),
        user_id INTEGER REFERENCES users(id),
        table_id INTEGER REFERENCES tables(id),
        date DATE NOT NULL,
        time TIME NOT NULL,
        guests INTEGER NOT NULL,
        occasion VARCHAR(50),
        special_requests TEXT,
        status VARCHAR(20) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create sessions table
    await query(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR NOT NULL PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      )
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS IDX_sessions_expire ON sessions (expire)
    `);

    // Insert default restaurant if none exists
    const restaurants = await query('SELECT * FROM restaurants');
    if (restaurants.rowCount === 0) {
      await query(`
        INSERT INTO restaurants (
          name, 
          description, 
          cuisine_type, 
          price_range, 
          location, 
          distance,
          image_url, 
          rating,
          open_time, 
          close_time, 
          features,
          capacity
        )
        VALUES (
          'KCA Streetfood', 
          'KCA Streetfood offers a unique dining experience with a variety of local and international street food favorites. Our modern space features indoor and outdoor seating perfect for casual dining, study sessions, or catching up with friends.',
          'Street Food',
          '$',
          'KCA University, Ruaraka',
          '0 km', 
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          '4.7',
          '07:00',
          '22:00',
          ARRAY['Student Discounts', 'Outdoor Seating', 'Quick Service', 'Vegetarian Options', 'Breakfast Available'],
          50
        )
      `);

      // Add seed admin user if not exists
      const adminExists = await query('SELECT * FROM users WHERE username = $1', ['admin']);
      
      if (adminExists.rowCount === 0) {
        // Create a secure hash with bcrypt
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('admin123', salt);
        
        await query(`
          INSERT INTO users
            (username, password, name, email, phone, is_admin)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          'admin',
          password,
          'Restaurant Admin',
          'admin@kcastreetfood.com',
          '+254700000000',
          true
        ]);
        
        console.log('[SEED] Created admin user (username: admin, password: admin123)');
      }
    }

    console.log('[SQL] Database initialized successfully');
  } catch (err) {
    console.error('[SQL] Error initializing database:', err.message);
    throw err;
  }
}

// Initialize database on server startup
initializeDatabase();

module.exports = {
  pool,
  query,
  transaction,
  initializeDatabase
};