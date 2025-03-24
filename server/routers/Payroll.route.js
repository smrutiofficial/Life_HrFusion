const express = require("express");
const {
  getPayroll,
  getAllPayrolls,
  updatePayroll,
  addAllowance,
  updateAllowance,
  deleteAllowance,
  addDeduction,
  updateDeduction,
  deleteDeduction,
} = require("../controllers/Payroll.controller");

const router = express.Router();

router.get("/:userId", getPayroll);
router.get("/all", getAllPayrolls);
router.put("/update/:userId", updatePayroll);

router.put("/allowance/:userId", addAllowance);
router.patch("/allowance/:userId/:allowanceId", updateAllowance); 
router.delete("/allowance/:userId/:allowanceId", deleteAllowance); 

router.put("/deduction/:userId", addDeduction);
router.patch("/deduction/:userId/:deductionId", updateDeduction);
router.delete("/deduction/:userId/:deductionId", deleteDeduction);

module.exports = router;
