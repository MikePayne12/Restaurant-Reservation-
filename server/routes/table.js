const express = require('express');
const router = express.Router();
const { storage } = require('../models/sql-storage');
const { authenticateToken, requireAdmin } = require('../utils/auth');

// Get all tables for a restaurant
router.get('/restaurant/:id', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);
    const tables = await storage.listTables(restaurantId);
    res.json(tables);
  } catch (error) {
    console.error('Error getting tables:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific table
router.get('/:id', async (req, res) => {
  try {
    const table = await storage.getTable(parseInt(req.params.id));
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    res.json(table);
  } catch (error) {
    console.error('Error getting table:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Create a table (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { restaurantId, tableNumber, capacity, location, status = 'available' } = req.body;
    
    // Validate table data
    if (!restaurantId || !tableNumber || !capacity) {
      return res.status(400).json({ message: 'Restaurant ID, table number, and capacity are required' });
    }
    
    // Create table
    const table = await storage.createTable({
      restaurantId,
      tableNumber,
      capacity,
      location,
      status
    });
    
    res.status(201).json(table);
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update a table (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { tableNumber, capacity, location, status } = req.body;
    const tableId = parseInt(req.params.id);
    
    // Update table
    const updatedTable = await storage.updateTable(tableId, {
      tableNumber,
      capacity,
      location,
      status
    });
    
    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    res.json(updatedTable);
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Find available tables for a reservation
router.get('/available', async (req, res) => {
  try {
    const { restaurantId, date, time, guests } = req.query;
    
    // Validate parameters
    if (!restaurantId || !date || !time || !guests) {
      return res.status(400).json({ 
        message: 'Restaurant ID, date, time, and number of guests are required' 
      });
    }
    
    const availableTables = await storage.findAvailableTables(
      parseInt(restaurantId),
      date,
      time,
      parseInt(guests)
    );
    
    res.json(availableTables);
  } catch (error) {
    console.error('Error finding available tables:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;