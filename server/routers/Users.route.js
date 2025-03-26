const express = require("express");
const {
  registerUser,
  verifyOtp,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUsers,
  requestPasswordReset,
  verifyEmail,
} = require("../controllers/User.controller.js");
const { authenticate, authorize } = require("../middlewares/auth.middleware.js"); // Protect routes

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/reset-password", requestPasswordReset);
router.post("/verify-email", verifyEmail);

// Protected Routes
router.put("/update/:userId", authenticate, updateUser);
router.delete("/delete/:userId", authenticate, deleteUser);
router.get("/all", authenticate, authorize(["admin"]), getAllUsers);

module.exports = router;
