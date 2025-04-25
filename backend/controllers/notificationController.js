const asyncHandler = require("express-async-handler");
const Notification = require('../models/Notification');

// ✅ Create a notification
const createNotification = async (recipientId, recipientType, message) => {
    const notification = new Notification({
      recipientId,
      recipientType,
      message,
    });
    await notification.save();
    return notification;
  };
  
// ✅ Mark all as read
const markAllAsRead = async (req, res) => {
    const notifications = await Notification.find({
      recipientId: req.user._id,
      recipientType: req.user.role,
      read: false,
    });

 
    for (let i = 0; i < notifications.length; i++) {
        notifications[i].read = true;
        await notifications[i].save();
      }
      res.json({ message: 'All notifications marked as read' });
    };
      
// ✅ Get unread count
const getUnreadCount = async (req, res) => {
    const unreadNotifications = await Notification.find({
      recipientId: req.user._id,
      recipientType: req.user.role,
      read: false,
    });
  
    res.json({ unreadCount: unreadNotifications.length });
  };
  
// ✅ Delete all notifications
const deleteAllNotifications = async (req, res) => {
    const notifications = await Notification.find({
      recipientId: req.user._id,
      recipientType: req.user.role,
    });
  
    for (let i = 0; i < notifications.length; i++) {
      await notifications[i].deleteOne();
    }
  
    res.json({ message: 'All notifications deleted successfully' });
  };

  // @desc Get all notifications for logged-in user/organization
// @route GET /api/notifications
const getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    recipientId: req.user._id,
    recipientType: req.user.role,
  }).sort({ createdAt: -1 }); // latest first

  res.json(notifications);
});
  
  module.exports = {
    createNotification,
    markAllAsRead,
    getUnreadCount,
    deleteAllNotifications,
    getAllNotifications, 
  };