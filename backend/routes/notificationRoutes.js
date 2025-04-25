const express = require('express');
const { 
  getAllNotifications, 
  markAllAsRead, 
  getUnreadCount, 
  createNotification,
  deleteAllNotifications 
} = require('../controllers/notificationController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

// Create a new notification
// POST /api/notifications
router.post('/', validateToken, createNotification);


// Get all notifications for logged-in user/organization
// GET /api/notifications
router.get('/', validateToken, getAllNotifications);

// Mark all notifications as read
// PUT /api/notifications/mark-all-read
router.put('/mark-all-read', validateToken, markAllAsRead);

// Get unread notification count
// GET /api/notifications/unread-count
router.get('/unread-count', validateToken, getUnreadCount);

// Delete all notifications for the logged-in user/organization
// DELETE /api/notifications
router.delete('/', validateToken, deleteAllNotifications);

module.exports = router;
