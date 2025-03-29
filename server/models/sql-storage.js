const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const { pool, query } = require('../db');

class SqlStorage {
  constructor() {
    this.sessionStore = new PgSession({
      pool,
      tableName: 'sessions',
      createTableIfMissing: true
    });
  }

  // User operations
  async getUser(id) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async getUserByUsername(username) {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  async getUserByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  async createUser(userData) {
    const { username, password, name, email, phone, is_admin = false } = userData;
    const result = await query(
      'INSERT INTO users (username, password, name, email, phone, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, password, name, email, phone, is_admin]
    );
    return result.rows[0];
  }

  async updateUser(id, userData) {
    const { username, name, email, phone } = userData;
    const result = await query(
      'UPDATE users SET username = $1, name = $2, email = $3, phone = $4 WHERE id = $5 RETURNING *',
      [username, name, email, phone, id]
    );
    return result.rows[0];
  }

  // Restaurant operations
  async getRestaurant(id) {
    const result = await query('SELECT * FROM restaurants WHERE id = $1', [id]);
    return result.rows[0];
  }

  async listRestaurants() {
    const result = await query('SELECT * FROM restaurants');
    return result.rows;
  }

  async searchRestaurants(searchTerm) {
    const result = await query(
      'SELECT * FROM restaurants WHERE name ILIKE $1 OR cuisine_type ILIKE $1',
      [`%${searchTerm}%`]
    );
    return result.rows;
  }

  // Table operations
  async getTable(id) {
    const result = await query('SELECT * FROM tables WHERE id = $1', [id]);
    return result.rows[0];
  }

  async listTables(restaurantId) {
    const result = await query('SELECT * FROM tables WHERE restaurant_id = $1', [restaurantId]);
    return result.rows;
  }

  async createTable(tableData) {
    const { restaurantId, tableNumber, capacity, location, status = 'available' } = tableData;
    const result = await query(
      'INSERT INTO tables (restaurant_id, table_number, capacity, location, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [restaurantId, tableNumber, capacity, location, status]
    );
    return result.rows[0];
  }

  async updateTable(id, tableData) {
    const { tableNumber, capacity, location, status } = tableData;
    const result = await query(
      'UPDATE tables SET table_number = $1, capacity = $2, location = $3, status = $4 WHERE id = $5 RETURNING *',
      [tableNumber, capacity, location, status, id]
    );
    return result.rows[0];
  }

  // Reservation operations
  async getReservation(id) {
    const result = await query('SELECT * FROM reservations WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createReservation(reservationData) {
    const { 
      restaurantId, 
      userId, 
      tableId, 
      date, 
      time, 
      guests, 
      occasion, 
      specialRequests, 
      status = 'confirmed' 
    } = reservationData;
    
    const result = await query(
      `INSERT INTO reservations 
        (restaurant_id, user_id, table_id, date, time, guests, occasion, special_requests, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [restaurantId, userId, tableId, date, time, guests, occasion, specialRequests, status]
    );
    return result.rows[0];
  }

  async updateReservation(id, reservationData) {
    const { date, time, guests, occasion, specialRequests, status } = reservationData;
    const result = await query(
      `UPDATE reservations 
       SET date = $1, time = $2, guests = $3, occasion = $4, special_requests = $5, status = $6 
       WHERE id = $7 RETURNING *`,
      [date, time, guests, occasion, specialRequests, status, id]
    );
    return result.rows[0];
  }

  async getUserReservations(userId) {
    const result = await query(
      `SELECT r.*, rt.name as restaurant_name
       FROM reservations r
       JOIN restaurants rt ON r.restaurant_id = rt.id
       WHERE r.user_id = $1
       ORDER BY r.date DESC, r.time DESC`,
      [userId]
    );
    return result.rows;
  }

  async getUpcomingReservations(userId) {
    const today = new Date().toISOString().split('T')[0];
    
    const result = await query(
      `SELECT r.*, rt.name as restaurant_name
       FROM reservations r
       JOIN restaurants rt ON r.restaurant_id = rt.id
       WHERE r.user_id = $1 AND (r.date > $2 OR (r.date = $2 AND r.time > CURRENT_TIME))
       ORDER BY r.date ASC, r.time ASC`,
      [userId, today]
    );
    return result.rows;
  }

  async getPastReservations(userId) {
    const today = new Date().toISOString().split('T')[0];
    
    const result = await query(
      `SELECT r.*, rt.name as restaurant_name
       FROM reservations r
       JOIN restaurants rt ON r.restaurant_id = rt.id
       WHERE r.user_id = $1 AND (r.date < $2 OR (r.date = $2 AND r.time < CURRENT_TIME))
       ORDER BY r.date DESC, r.time DESC`,
      [userId, today]
    );
    return result.rows;
  }

  async findAvailableTables(restaurantId, date, time, guests) {
    // Find tables that can accommodate the party size and are not already reserved
    const result = await query(
      `SELECT t.* FROM tables t
       WHERE t.restaurant_id = $1
       AND t.capacity >= $2
       AND t.status = 'available'
       AND t.id NOT IN (
         SELECT r.table_id FROM reservations r
         WHERE r.restaurant_id = $1
         AND r.date = $3
         AND r.time = $4
         AND r.status IN ('confirmed', 'pending')
       )
       ORDER BY t.capacity ASC`,
      [restaurantId, guests, date, time]
    );
    return result.rows;
  }
}

// Export an instance of the storage class
module.exports = {
  storage: new SqlStorage()
};