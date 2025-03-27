const User = require("../models/Users.model");
const Profile = require("../models/Profile.model");
const Attendance = require("../models/Attendance.model");
const mongoose = require("mongoose");

const getUserStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    // Total users
    const totalUsers = await User.countDocuments();
    // Active users
    const activeUsers = await Profile.countDocuments({ status: "active" });
    // New hires this month
    const newHiredThisMonth = await Profile.countDocuments({
      joinedDate: { $gte: startOfMonth.toISOString() },
    });
    // Total absent today
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const totalAbsentToday = await Attendance.countDocuments({
      "attendance.date": { $gte: startOfDay, $lte: endOfDay },
      "attendance.status": "Absent",
    });

    res.json({
      totalUsers,
      activeUsers,
      newHiredThisMonth,
      totalAbsentToday,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUserStats };
