// C:\Users\Admin\RAUL\server\routes\restaurant.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all restaurants - This is public for browsing
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific restaurant by ID - This is public for browsing
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantResult = await db.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    
    if (restaurantResult.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const restaurant = restaurantResult.rows[0];
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;