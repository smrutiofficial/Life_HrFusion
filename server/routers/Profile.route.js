const express = require("express");
const {
  createProfile,
  getProfile,
  updateProfile,
  updatecuserProfile,
  deleteProfile,
  getEmployees,
  updateEmployeecprofile,
  getCurrentUserProfile
} = require("../controllers/Profile.controller");
const { authenticate } = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post("/", createProfile);
router.get("/user/me", authenticate, getCurrentUserProfile);
router.put("/update", authenticate, updatecuserProfile);
router.get("/user/:role", authenticate, getEmployees);
router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);
router.delete("/:userId", authenticate, deleteProfile);
// Update employee profile & user data
router.put("/employee/:userId", updateEmployeecprofile);


module.exports = router;
