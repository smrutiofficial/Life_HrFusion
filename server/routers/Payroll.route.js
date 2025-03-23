const express = require("express");
const {
  addPayroll,
  getPayroll,
  addAllowance,
  addDeduction,
  updatePayroll,
  deletePayroll,
  getAllPayrolls,
  processPayroll,
} = require("../controllers/Payroll.controller.js");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Protected Routes
router.post("/add", authenticate, authorize(["admin", "HR"]), addPayroll);
router.get("/:userId", getPayroll);
router.put("/update/:userId", updatePayroll);
router.put("/add-allowance/:userId", addAllowance);
router.put("/add-deduction/:userId", addDeduction);
router.delete(
  "/delete/:userId",
  authenticate,
  authorize(["admin"]),
  deletePayroll
);
router.get("/all", authenticate, authorize(["admin", "HR"]), getAllPayrolls);
router.post(
  "/process/:payrollId",
  authenticate,
  authorize(["admin"]),
  processPayroll
);

module.exports = router;
