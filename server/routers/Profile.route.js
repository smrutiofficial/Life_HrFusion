const express = require("express");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getEmployees,
  getCurrentUserProfile
} = require("../controllers/Profile.controller");
const { authenticate } = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post("/", createProfile);
router.get("/user/me", authenticate, getCurrentUserProfile);
router.get("/user/:role", authenticate, getEmployees);
router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);
router.delete("/:userId", authenticate, deleteProfile);

module.exports = router;
