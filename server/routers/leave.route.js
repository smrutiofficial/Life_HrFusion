const express = require("express");
const {
  addNewReqById,
  getAllReqById,
  updateReqStatus,
} = require("../controllers/Leave.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();
// Add new leave request for a user
router.post("/request", authenticate, addNewReqById);
// Get all leave requests for a user (sorted from newest to oldest)
router.get("/get", authenticate, getAllReqById);
// Update leave request status (Approve/Reject)
router.put("/:userId/:leaveId", updateReqStatus);

module.exports = router;
