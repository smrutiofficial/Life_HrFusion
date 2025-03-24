const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date},
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Not set"],
    default: "Not set",
  },
});

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Ensure one document per user
  },
  attendance: [attendanceRecordSchema], // Array of attendance records
});

module.exports = mongoose.model("Attendance", attendanceSchema);