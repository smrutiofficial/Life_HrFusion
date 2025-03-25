const express = require("express");
const {
  getPayroll,
  getAllEmployeePayroll,
  getCurrentUserProfileWithPayroll,
  updatePayroll,
  addAllowance,
  updateAllowance,
  deleteAllowance,
  addDeduction,
  updateDeduction,
  deleteDeduction,
} = require("../controllers/Payroll.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { calculateIncomeTax } = require("../controllers/incometax.controller");

const router = express.Router();

router.get("/cuser",authenticate,getCurrentUserProfileWithPayroll)
router.get("/:userId", getPayroll);
router.get("/role/:role", getAllEmployeePayroll);
router.put("/update/:userId", updatePayroll);

router.put("/allowance/:userId", addAllowance);
router.patch("/allowance/:userId/:allowanceId", updateAllowance); 
router.delete("/allowance/:userId/:allowanceId", deleteAllowance); 

router.put("/deduction/:userId", addDeduction);
router.patch("/deduction/:userId/:deductionId", updateDeduction);
router.delete("/deduction/:userId/:deductionId", deleteDeduction);
// **New Route for Income Tax Calculation**
router.post("/incometax", calculateIncomeTax);

module.exports = router;
