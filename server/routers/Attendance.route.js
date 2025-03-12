const express =require("express");
const {
  markAttendance,
  getUserAttendance,
  getAllAttendance,
  updateAttendance,
  deleteAttendance,
} =require("../controllers/Attendance.controller.js");
const { authenticate, authorize } = require("../middlewares/auth.middleware.js"); // Middleware for security

const router = express.Router();

// Protected Routes
router.post("/mark", authenticate, authorize(["employee","HR"]), markAttendance);
router.get("/user/:userId", authenticate, authorize(["employee", "HR", "admin"]), getUserAttendance);
router.get("/all", authenticate, authorize(["HR", "admin"]), getAllAttendance);
router.put("/update/:attendanceId", authenticate, authorize(["HR", "admin"]), updateAttendance);
router.delete("/delete/:attendanceId", authenticate, authorize(["admin"]), deleteAttendance);

module.exports = router;
