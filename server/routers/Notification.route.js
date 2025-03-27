const express =require("express");
const {
  sendNotification,
  getNotifications,
  getAnnouncements
} =require("../controllers/Notification.controller.js");
const { authenticate, authorize } =require("../middlewares/auth.middleware.js");

const router = express.Router();


// Route to send a notification
router.post("/send",authenticate, sendNotification);
// Route to get a notification
router.get("/get/inbox",authenticate, getNotifications);
router.get("/get/announcements", getAnnouncements);

module.exports=router;
