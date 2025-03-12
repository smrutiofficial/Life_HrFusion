const express =require ("express");
const {
  applyLeave,
  getUserLeaveStatus,
  getAllLeaveRequests,
  approveLeave,
  rejectLeave,
  cancelLeave,
} =require ("../controllers/Leave.controller.js");
const { authenticate, authorize } =require("../middlewares/auth.middleware.js"); // Middleware for security

const router = express.Router();

// Protected Routes
router.post("/apply", authenticate, authorize(["employee", "HR" ]), applyLeave);
router.get("/status/:userId", authenticate, authorize(["employee", "HR", "admin"]), getUserLeaveStatus);
router.get("/all", authenticate, authorize(["HR", "admin"]), getAllLeaveRequests);
router.put("/approve/:leaveId", authenticate, authorize(["HR", "admin"]), approveLeave);
router.put("/reject/:leaveId", authenticate, authorize(["HR", "admin"]), rejectLeave);
router.delete("/cancel/:leaveId", authenticate, authorize(["employee", "HR", "admin"]), cancelLeave);

module.exports=router;
