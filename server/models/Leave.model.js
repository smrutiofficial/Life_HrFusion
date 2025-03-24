const mongoose = require("mongoose");

const leaveRecordSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    enum: ["Sick", "Casual", "Paid", "Unpaid"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to HR/Admin who approves
});

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Ensure one document per user
  },
  leaves: [leaveRecordSchema], // Array of leave records
});

module.exports = mongoose.model("Leave", leaveSchema);