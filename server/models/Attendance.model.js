const mongoose =require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: Number, required: true }, // Reference to User ID
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" }
});


module.exports = mongoose.model("Attendance", attendanceSchema);
