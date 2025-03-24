const Attendance = require("../models/Attendance.model");
const User = require("../models/Users.model");
const Profile = require("../models/Profile.model");

// Get attendance by userId with User and Profile details
const getAttendanceById = async (req, res) => {
  try {
    const { userId } = req.params;

    const attendance = await Attendance.findOne({ userId })
      .populate({ path: "userId", select: "name email", model: User })
      .populate({
        path: "userId",
        populate: { path: "profile", model: Profile },
      });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get today's attendance by userId
const getTodayAttendanceById = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ userId })
      .populate({ path: "userId", select: "name email", model: User })
      .populate({
        path: "userId",
        populate: { path: "profile", model: Profile },
      });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const record = attendance.attendance.find(
      (record) => record.date.toISOString().split("T")[0] === today
    );
    if (!record) {
      return res
        .status(404)
        .json({ message: "No attendance record found for today" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update check-in time, location, and set status to 'Present' for the current date
const updateCheckIn = async (req, res) => {
  try {
    const { userId } = req.params;
    const { checkIn, location } = req.body; // No checkOut here
    const today = new Date().toISOString().split("T")[0];

    let attendance = await Attendance.findOne({ userId });
    if (!attendance) {
      attendance = new Attendance({ userId, attendance: [] });
    }

    let record = attendance.attendance.find(
      (record) => record.date.toISOString().split("T")[0] === today
    );

    if (!record) {
      record = {
        date: new Date(),
        checkIn,
        location,
        status: "Present",
        checkOut: null, // Default checkOut value
      };
      attendance.attendance.push(record);
    } else {
      record.checkIn = checkIn;
      record.location = location;
      record.status = "Present";
      record.checkOut = null;
    }

    await attendance.save();
    res
      .status(200)
      .json({ message: "Check-in time updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update check-out time for the current date
const updateCheckOut = async (req, res) => {
  try {
    const { userId } = req.params;
    const { checkOut } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ userId });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const record = attendance.attendance.find(
      (record) => record.date.toISOString().split("T")[0] === today
    );
    if (!record) {
      return res
        .status(404)
        .json({ message: "No attendance record found for today" });
    }

    record.checkOut = checkOut;

    await attendance.save();
    res
      .status(200)
      .json({ message: "Check-out time updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAttendanceById,
  getTodayAttendanceById,
  updateCheckIn,
  updateCheckOut,
};
