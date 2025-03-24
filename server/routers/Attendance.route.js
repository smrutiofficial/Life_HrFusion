const express = require("express");
const router = express.Router();
const {
  getAttendanceById,
  getTodayAttendanceById,
  updateCheckIn,
  updateCheckOut,
} = require("../controllers/Attendance.controller");

// Get attendance by user ID
router.get("/:userId", getAttendanceById);
// Get today's attendance by user ID
router.get("/today/:userId", getTodayAttendanceById);
// Check-in: update check-in time, location, and set status to "Present"
router.put("/checkin/:userId", updateCheckIn);
// Check-out: update check-out time for the current date
router.put("/checkout/:userId", updateCheckOut);

module.exports = router;
