const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true }, // Unique 8-digit user ID
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employee", "HR", "admin"],
      default: "employee",
    },
    position: { type: String, required: true },
    dateOfJoining: {type:String},
    avatar: { type: String }, // Profile Image URL
    status: { type: String, enum: ["active", "inactive"], default: "active" }, // Active or Inactive user
    // ---------------------------------------------
    emailVerified: { type: Boolean, default: false }, // Email Verification Status
    verifyOtp: { type: String, default: "" }, // OTP for email verification
    verifyOtpExpireAt: { type: String, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetToken: { type: String, default: "" }, // Password Reset Token
    resetTokenExpire: { type: Date, default: 0 }, // Expiry Time for Reset Token
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
