const express =require("express");
const {
  sendNotification,
  getNotifications,
  deleteNotification,
} =require("../controllers/Notification.controller.js");
const { authenticate, authorize } =require("../middlewares/auth.middleware.js");

const router = express.Router();

// Routes for Notifications
router.post("/send",authenticate, authorize(["HR", "admin"]), sendNotification);
router.get("/", authenticate, getNotifications);
router.delete("/:notificationId", authenticate, authorize(["HR", "admin"]), deleteNotification);

module.exports=router;
