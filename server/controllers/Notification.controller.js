const Notification = require("../models/Notifications.model");
const User = require("../models/Users.model");
// const mongoose = require("mongoose");

// Send Notification
const sendNotification = async (req, res) => {
  try {
    const { id } = req.user; // Extract from token middleware
    const { recipients, tittle, message, priority, timerLeft } = req.body;

    if (!recipients || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate expiration time
    const expiresAt = new Date(
      Date.now() + (timerLeft || 2 * 24 * 60 * 60) * 1000
    );

    // Create Notification
    const newNotification = new Notification({
      fromUser: id, // Use the ID from the token
      recipients,
      tittle,
      message,
      priority: priority || "normal",
      timerLeft: timerLeft || 2 * 24 * 60 * 60, // Default 2 days
      expiresAt,
    });

    await newNotification.save();
    return res.status(201).json({
      message: "Notification sent successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getNotifications = async (req, res) => {
  try {
    const { id } = req.user; // Get user ID from middleware

    // Fetch the user to get their role
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userRole = user.role; // Get user role

    // Exclude "everyone" notifications
    let recipientFilter = { 
      recipients: userRole, 
      recipients: { $ne: "everyone" } // Exclude "everyone"
    };

    if (userRole === "admin") {
      recipientFilter = { recipients: { $ne: "everyone" } }; // Admins see all *except* "everyone"
    }

    // Fetch notifications
    const notifications = await Notification.find(recipientFilter)
      .sort({ createdAt: -1 }) // Sort by latest first
      .populate("fromUser", "name email avatar"); // Populate sender details

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Announcements (Only 'everyone' Notifications)
const getAnnouncements = async (req, res) => {
  try {
    // Fetch only announcements meant for all users
    const announcements = await Notification.find({
      recipients: "everyone",
    }).sort({ createdAt: -1 });

    return res.status(200).json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Auto Delete Expired Notifications
const autoDeleteExpiredNotifications = async () => {
  try {
    const now = new Date();
    const result = await Notification.deleteMany({ expiresAt: { $lte: now } });

    console.log(`Deleted ${result.deletedCount} expired notifications.`);
  } catch (error) {
    console.error("Error deleting expired notifications:", error);
  }
};

// Export controllers
module.exports = {
  sendNotification,
  getAnnouncements,
  autoDeleteExpiredNotifications,
  getNotifications,
};
