const Leave = require("../models/Leave.model");
const User = require("../models/Users.model");
const Profile = require("../models/Profile.model");

// Add a new leave request by userId
const addNewReqById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { leaveType, startDate, endDate, reason } = req.body;

    let leave = await Leave.findOne({ userId });

    if (!leave) {
      leave = new Leave({ userId, leaves: [] });
    }

    const newLeaveRequest = {
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
      appliedAt: new Date(),
    };

    leave.leaves.push(newLeaveRequest);
    await leave.save();

    res
      .status(201)
      .json({ message: "Leave request added successfully", leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllReqById = async (req, res) => {
  try {
    const { userId } = req.params;

    const leave = await Leave.findOne({ userId })
      .populate({
        path: "userId",
        select: "name email", // Fetch only name and email from User model
        model: User
      })
      .populate({
        path: "userId",
        populate: {
          path: "profile",
          model: Profile
        },
      });

    if (!leave || leave.leaves.length === 0) {
      return res.status(404).json({ message: "No leave records found" });
    }

    // Sort leave requests from newest to oldest
    const sortedLeaves = leave.leaves.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    res.status(200).json({ user: leave.userId, leaves: sortedLeaves });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update leave request status (Approve/Reject)
const updateReqStatus = async (req, res) => {
  try {
    const { userId, leaveId } = req.params;
    const { status, approvedBy } = req.body; // status should be 'Approved' or 'Rejected'

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const leave = await Leave.findOne({ userId });
    if (!leave) {
      return res.status(404).json({ message: "Leave record not found" });
    }

    const leaveRequest = leave.leaves.id(leaveId);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leaveRequest.status = status;
    leaveRequest.approvedBy = approvedBy || null; // Store HR/Admin ID if provided

    await leave.save();

    res.status(200).json({ message: `Leave request ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addNewReqById,
  getAllReqById,
  updateReqStatus,
};
