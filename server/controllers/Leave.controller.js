const Leave=require("../models/Leave.model.js");
const User=require("../models/Users.model.js");

// @desc Apply for leave
// @route POST /leave/apply
// @access Private (Employee)
const applyLeave = async (req, res) => {
  try {
    const { userId, startDate, endDate, reason, leaveType } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const leave = await Leave.create({
      userId,
      startDate,
      endDate,
      reason,
      leaveType,
    });

    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Check leave status for a user
// @route GET /leave/status/:userId
// @access Private (Employee, HR, Admin)
const getUserLeaveStatus = async (req, res) => {
  try {
    const leaveRecords = await Leave.find({ userId: req.params.userId }).sort({ startDate: -1 });

    if (!leaveRecords.length) return res.status(404).json({ message: "No leave records found" });

    res.json(leaveRecords);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get all leave requests
// @route GET /leave/all
// @access Private (HR, Admin)
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.find().populate("userId", "name email position").sort({ startDate: -1 });

    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Approve leave request
// @route PUT /leave/approve/:leaveId
// @access Private (HR, Admin)
const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.leaveId,
      { status: "approved" },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    res.json({ message: "Leave approved successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Reject leave request
// @route PUT /leave/reject/:leaveId
// @access Private (HR, Admin)
const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.leaveId,
      { status: "rejected" },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    res.json({ message: "Leave rejected successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Cancel leave request
// @route DELETE /leave/cancel/:leaveId
// @access Private (Employee, HR, Admin)
const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.leaveId);

    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    res.json({ message: "Leave request cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports={
applyLeave,
getUserLeaveStatus,
getAllLeaveRequests,
approveLeave,
rejectLeave,
cancelLeave
};