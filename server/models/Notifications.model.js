const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // The sender of the notification
      required: true,
    },
    recipients: {
      type: String,
      enum: ["all_employees", "all_hrs", "everyone"],
      required: true,
    },
    specificEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Specific users receiving the notification
      },
    ],
    message: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["normal", "urgent", "critical"],
      default: "normal",
    },
    timerLeft: { type: Number, required: true, default: 2 * 24 * 60 * 60 },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who have read the notification
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto-calculate `expiresAt` before saving
notificationSchema.pre("save", function (next) {
  if (!this.expiresAt) {
    this.expiresAt = new Date(Date.now() + this.timerLeft * 1000);
  }
  next();
});

module.exports = mongoose.model("Notification", notificationSchema);