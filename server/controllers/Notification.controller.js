const Notification = require("../models/Notifications.model");
const mongoose = require("mongoose");

// Send Notification
const sendNotification = async (req, res) => {
  try {
    const {
      fromUser,
      recipients,
      specificEmployees,
      message,
      priority,
      timerLeft,
    } = req.body;

    if (!fromUser || !message || !recipients) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Calculate expiration time
    const expiresAt = new Date(
      Date.now() + (timerLeft || 2 * 24 * 60 * 60) * 1000
    ); // Default 2 days

    // Create Notification
    const newNotification = new Notification({
      fromUser: new mongoose.Types.ObjectId(fromUser),
      recipients,
      specificEmployees: specificEmployees
        ? specificEmployees.map((id) => new mongoose.Types.ObjectId(id))
        : [],
      message,
      priority,
      timerLeft: timerLeft || 2 * 24 * 60 * 60, // Default to 2 days in seconds
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
  autoDeleteExpiredNotifications,
};
