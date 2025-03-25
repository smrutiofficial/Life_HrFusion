const express =require("express");
const {
  sendNotification,
} =require("../controllers/Notification.controller.js");
const { authenticate, authorize } =require("../middlewares/auth.middleware.js");

const router = express.Router();


// Route to send a notification
router.post("/send", sendNotification);

module.exports=router;
