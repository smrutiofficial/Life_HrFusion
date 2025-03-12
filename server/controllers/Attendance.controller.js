const Attendance = require("../models/Attendance.model.js");
const User = require("../models/Users.model.js");

// @desc Mark attendance (uses precise GPS location)
// @route POST /attendance/mark
// @access Private (Employee)
const markAttendance = async (req, res) => {
  try {
    const { userId, latitude, longitude, status } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const existingAttendance = await Attendance.findOne({ userId, date: today });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    const attendance = await Attendance.create({
      userId,
      date: new Date(),
      status: status || "present",
      location: { latitude, longitude },
    });

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get attendance records for a user
// @route GET /attendance/user/:userId
// @access Private (Employee, HR, Admin)
const getUserAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ userId: req.params.userId }).sort({ date: -1 });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found for this user" });
    }

    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get attendance records for all employees
// @route GET /attendance/all
// @access Private (HR, Admin)
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate("userId", "name email position").sort({ date: -1 });

    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update attendance details
// @route PUT /attendance/update/:attendanceId
// @access Private (Admin, HR)
const updateAttendance = async (req, res) => {
  try {
    const { status, latitude, longitude } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.attendanceId,
      { status, location: { latitude, longitude } },
      { new: true }
    );

    if (!updatedAttendance) return res.status(404).json({ message: "Attendance record not found" });

    res.json({ message: "Attendance updated successfully", updatedAttendance });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Remove an attendance record
// @route DELETE /attendance/delete/:attendanceId
// @access Private (Admin)
const deleteAttendance = async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.attendanceId);

    if (!deletedAttendance) return res.status(404).json({ message: "Attendance record not found" });

    res.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports={
  markAttendance,
  getUserAttendance,
  getAllAttendance,
  updateAttendance,
  deleteAttendance
}