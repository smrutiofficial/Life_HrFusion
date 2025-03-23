const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    position: { type: String, required: true },
    department: { type: String, required: true },
    joinedDate: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    experience: { type: Number, required: true, default: 0 },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    aadharCard: { type: String, required: true },
    panCard: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
