const { pool } = require('./db');

async function seedDatabase() {
  console.log('Starting KCA Streetfood database seeding...');
  
  try {
    // Check if restaurants already exist to avoid duplicates
    const existingRestaurants = await pool.query('SELECT * FROM restaurants WHERE name = $1', ['KCA Streetfood']);
    
    if (existingRestaurants.rows.length > 0) {
      console.log('KCA Streetfood already exists in the database. Skipping seed.');
      return;
    }
    
    // Insert restaurant data
    const restaurantQuery = `
      INSERT INTO restaurants 
        (name, description, cuisine_type, price_range, location, distance, image_url, rating, open_time, close_time, features) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `;
    
    const restaurantValues = [
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
      '{Student Discounts,Outdoor Seating,Quick Service,Vegetarian Options,Breakfast Available}'
    ];
    
    const restaurantResult = await pool.query(restaurantQuery, restaurantValues);
    const restaurantId = restaurantResult.rows[0].id;
    
    // Add operating hours (this would normally be in a separate table, but for simplicity we'll log it)
    console.log('Adding operating hours:');
    console.log('Monday - Friday: 07:00 - 22:00');
    console.log('Saturday: 08:00 - 22:00');
    console.log('Sunday: 09:00 - 20:00');
    
    // Create an admin user for the restaurant
    const adminExists = await pool.query('SELECT * FROM users WHERE username = $1', ['admin']);
    
    if (adminExists.rows.length === 0) {
      const hashedPassword = require('./utils/auth').hashPassword('admin123');
      
      const userQuery = `
        INSERT INTO users
          (username, password, name, email, phone, is_admin)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      
      await pool.query(userQuery, [
        'admin',
        await hashedPassword,
        'Restaurant Admin',
        'admin@kcastreetfood.com',
        '+254700000000',
        true
      ]);
      
      console.log('Created admin user (username: admin, password: admin123)');
    }
    
    console.log(`Successfully seeded database with KCA Streetfood (ID: ${restaurantId})`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
  
  const restaurantsResult = await db.query('SELECT * FROM restaurants');
    if (restaurantsResult.rows.length === 0) {
  // Add KCA Streetfood restaurant data
      await db.query(
    `INSERT INTO restaurants (
      name,
      description,
      address,
      phone,
      email,
      opening_time,
      closing_time,
      cuisine_type,
      price_range,
      image_url,
      features,
      rating
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      'KCA Streetfood',
      'KCA Streetfood offers a unique dining experience with a variety of local and international street food favorites. Our modern space features indoor and outdoor seating perfect for casual dining, study sessions, or catching up with friends.',
      'KCA University, Ruaraka',
      '+254 712 345678',
      'info@kcastreetfood.com',
      '07:00',
      '22:00',
      'Street Food',
      '$',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      ['Student Discounts', 'Outdoor Seating', 'Quick Service', 'Vegetarian Options', 'Breakfast Available'],
      4.7
    ]
  );
  
  console.log('[SEED] Added restaurant: KCA Streetfood');
 }
}

// Run if executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding complete!');
      process.exit(0);
    })
    .catch(err => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = { seedDatabase };