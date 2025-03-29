require('dotenv').config();
const { Pool } = require('pg');

async function testConnection() {
  console.log('Testing PostgreSQL connection...');
  console.log('Connection configuration:');
  console.log('  Host:', process.env.DB_HOST || 'localhost');
  console.log('  Port:', process.env.DB_PORT || 5432);
  console.log('  Database:', process.env.DB_NAME || 'restaurant_reservation');
  console.log('  User:', process.env.DB_USER || 'postgres');
  console.log('  Password:', process.env.DB_PASSWORD ? '********' : 'Not set');

  // PostgreSQL connection configuration
  const pgConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'restaurant_reservation',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  };

  const pool = new Pool(pgConfig);

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully!');
    
    // Try to perform a simple query
    const res = await client.query('SELECT NOW() as current_time');
    console.log('Current database time:', res.rows[0].current_time);
    
    // Try to create a test table
    console.log('Testing table creation...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS connection_test (
        id SERIAL PRIMARY KEY,
        test_column VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Test table created successfully!');
    
    // Insert a row
    await client.query(`
      INSERT INTO connection_test (test_column) 
      VALUES ('Connection test successful')
    `);
    console.log('Test row inserted successfully!');
    
    // Select the row
    const testResult = await client.query('SELECT * FROM connection_test');
    console.log('Test data:', testResult.rows);
    
    // Release the client
    client.release();
    
    // Database is working fine
    console.log('Database connection and operations test passed!');
    return true;
  } catch (err) {
    console.error('Database connection error:', err.message);
    if (err.code === '3D000') {
      console.error('\nThe database "restaurant_reservation" does not exist.');
      console.error('You need to create it first using createdb or pgAdmin.\n');
    } else if (err.code === '28P01') {
      console.error('\nAuthentication failed. Check your username and password.\n');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('\nConnection refused. Make sure PostgreSQL is running.\n');
    }
    return false;
  } finally {
    // End the pool
    await pool.end();
  }
}

// Run the test
testConnection()
  .then(success => {
    if (success) {
      console.log('\nYour database connection is set up correctly!');
    } else {
      console.log('\nPlease fix the database connection issues before proceeding.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });