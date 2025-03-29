const express = require('express');
const router = express.Router();
const { storage } = require('../models/sql-storage');
const { authenticateToken, requireAdmin } = require('../utils/auth');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await storage.listRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search restaurants
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const restaurants = await storage.searchRestaurants(query);
    res.json(restaurants);
  } catch (error) {
    console.error('Error searching restaurants:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await storage.getRestaurant(parseInt(req.params.id));
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Error getting restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Create a restaurant (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, cuisineType, priceRange, location, imageUrl, openTime, closeTime, capacity } = req.body;
    
    // Validate restaurant data
    if (!name || !location) {
      return res.status(400).json({ message: 'Restaurant name and location are required' });
    }
    
    // Create restaurant
    const restaurant = await storage.createRestaurant({
      name,
      description,
      cuisineType,
      priceRange,
      location,
      imageUrl,
      openTime,
      closeTime,
      capacity
    });
    
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a restaurant (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, cuisineType, priceRange, location, imageUrl, openTime, closeTime, capacity } = req.body;
    const restaurantId = parseInt(req.params.id);
    
    // Update restaurant
    const updatedRestaurant = await storage.updateRestaurant(restaurantId, {
      name,
      description,
      cuisineType,
      priceRange,
      location,
      imageUrl,
      openTime,
      closeTime,
      capacity
    });
    
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;