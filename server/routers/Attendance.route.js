const express = require("express");
const router = express.Router();
const {
  getAttendanceById,
  getTodayAttendanceById,
  getTodayAttendance,
  updateCheckIn,
  updateCheckOut,
  updateCheckInme,
  updateCheckOutme,
} = require("../controllers/Attendance.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// Get attendance by user ID
router.get("/:userId", getAttendanceById);
// Get today's attendance by auth
router.get("/today/get/me", authenticate, getTodayAttendance);
// Get today's attendance by auth
router.put("/today/checkin/me", authenticate, updateCheckInme);
// Get today's attendance by auth
router.put("/today/checkout/me", authenticate, updateCheckOutme);
// Get today's attendance by user ID
router.get("/today/:userId", getTodayAttendanceById);
// Check-in: update check-in time, location, and set status to "Present"
router.put("/checkin/:userId", updateCheckIn);
// Check-out: update check-out time for the current date
router.put("/checkout/:userId", updateCheckOut);

module.exports = router;
