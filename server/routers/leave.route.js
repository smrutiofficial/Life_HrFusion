const express = require("express");
const {
  addNewReqById,
  getAllReqById,
  updateReqStatus,
} = require("../controllers/Leave.controller");

const router = express.Router();
// Add new leave request for a user
router.post("/:userId", addNewReqById);
// Get all leave requests for a user (sorted from newest to oldest)
router.get("/:userId", getAllReqById);
// Update leave request status (Approve/Reject)
router.put("/:userId/:leaveId", updateReqStatus);

module.exports = router;
