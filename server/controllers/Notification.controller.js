const Notification=require("../models/Notifications.model");
const User = require("../models/Users.model")
// @desc Send a notification (Only HR/Admin can send)
// @route POST /notifications/send
// @access Private (HR, Admin)
const sendNotification = async (req, res) => {
  try {
    const {userId, title, message, recipientType } = req.body;
  // Fetch user details from the User model
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the user has the required role (HR or Admin)
  if (!["HR", "admin"].includes(user.role)) {
    return res.status(403).json({ message: "Access denied. Only HR or Admin can send notifications." });
  }

  // Proceed with sending notification
  const notification = new Notification({
    title,
    message,
    recipientType,
    sender: userId
  });
  await notification.save();
    res.status(201).json({ message: "Notification sent successfully", notification });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get all notifications for the logged-in user
// @route GET /notifications
// @access Private (All users)
const getNotifications = async (req, res) => {
  try {
    let recipientFilter = { recipientType: "all" }; // Default to "all" notifications

    if (req.user.role === "employee") {
      recipientFilter = { $or: [{ recipientType: "employee" }, { recipientType: "all" }] };
    } else if (req.user.role === "HR") {
      recipientFilter = { $or: [{ recipientType: "HR" }, { recipientType: "all" }] };
    } else if (req.user.role === "admin") {
      recipientFilter = { $or: [{ recipientType: "admin" }, { recipientType: "all" }] };
    }

    const notifications = await Notification.find(recipientFilter).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Delete a notification (Only HR/Admin)
// @route DELETE /notifications/:notificationId
// @access Private (HR, Admin)
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    if (!["HR", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Only HR or Admin can delete notifications." });
    }

    await Notification.findByIdAndDelete(req.params.notificationId);

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports={
sendNotification,
getNotifications,
deleteNotification,
};