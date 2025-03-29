const express = require('express');
const router = express.Router();
const { storage } = require('../models/sql-storage');
const { authenticateToken, requireAdmin } = require('../utils/auth');

// Get all reservations for current user
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const reservations = await storage.getUserReservations(req.user.id);
    res.json(reservations);
  } catch (error) {
    console.error('Error getting user reservations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming reservations for current user
router.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const reservations = await storage.getUpcomingReservations(req.user.id);
    res.json(reservations);
  } catch (error) {
    console.error('Error getting upcoming reservations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get past reservations for current user
router.get('/past', authenticateToken, async (req, res) => {
  try {
    const reservations = await storage.getPastReservations(req.user.id);
    res.json(reservations);
  } catch (error) {
    console.error('Error getting past reservations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific reservation
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const reservation = await storage.getReservation(parseInt(req.params.id));
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    // Check if the reservation belongs to the current user (or is admin)
    if (reservation.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access to reservation' });
    }
    
    res.json(reservation);
  } catch (error) {
    console.error('Error getting reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new reservation
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      restaurantId, 
      tableId, 
      date, 
      time, 
      guests, 
      occasion, 
      specialRequests,
      status = 'confirmed' 
    } = req.body;
    
    // Validate reservation data
    if (!restaurantId || !tableId || !date || !time || !guests) {
      return res.status(400).json({ 
        message: 'Restaurant ID, table ID, date, time, and number of guests are required' 
      });
    }
    
    // Create reservation
    const reservation = await storage.createReservation({
      restaurantId,
      userId: req.user.id,
      tableId,
      date,
      time,
      guests,
      occasion,
      specialRequests,
      status
    });
    
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a reservation
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { date, time, guests, occasion, specialRequests, status } = req.body;
    const reservationId = parseInt(req.params.id);
    
    // Check if the reservation exists and belongs to the user
    const existingReservation = await storage.getReservation(reservationId);
    
    if (!existingReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    // Check if the reservation belongs to the current user (or is admin)
    if (existingReservation.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access to reservation' });
    }
    
    // Update reservation
    const updatedReservation = await storage.updateReservation(reservationId, {
      date,
      time,
      guests,
      occasion,
      specialRequests,
      status
    });
    
    res.json(updatedReservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel a reservation (update status to 'cancelled')
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const reservationId = parseInt(req.params.id);
    
    // Check if the reservation exists and belongs to the user
    const existingReservation = await storage.getReservation(reservationId);
    
    if (!existingReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    // Check if the reservation belongs to the current user (or is admin)
    if (existingReservation.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access to reservation' });
    }
    
    // Update reservation status to cancelled
    const updatedReservation = await storage.updateReservation(reservationId, {
      ...existingReservation,
      status: 'cancelled'
    });
    
    res.json(updatedReservation);
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all reservations (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { date, restaurantId } = req.query;
    let reservations = [];
    
    if (date && restaurantId) {
      // Get reservations for a specific date and restaurant
      reservations = await storage.getReservationsByDateAndRestaurant(date, parseInt(restaurantId));
    } else if (date) {
      // Get reservations for a specific date
      reservations = await storage.getReservationsByDate(date);
    } else if (restaurantId) {
      // Get reservations for a specific restaurant
      reservations = await storage.getReservationsByRestaurant(parseInt(restaurantId));
    } else {
      // Get all reservations (limited to recent ones to avoid overload)
      reservations = await storage.getRecentReservations(100); // Limit to 100 most recent
    }
    
    res.json(reservations);
  } catch (error) {
    console.error('Error getting reservations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;