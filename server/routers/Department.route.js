const express = require("express");
const {
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
} = require("../controllers/Department.controller.js");
const { authenticate, authorize } = require("../middlewares/auth.middleware.js"); // Middleware for security

const router = express.Router();

// Protected Routes
router.post("/add",authenticate, authorize(["admin", "HR"]), addDepartment);
router.get("/:departmentId", authenticate, authorize(["admin", "HR"]), getDepartment);
router.put("/update/:departmentId", authenticate, authorize(["admin"]), updateDepartment);
router.delete("/delete/:departmentId", authenticate, authorize(["admin"]), deleteDepartment);
router.get("/all", authenticate, authorize(["admin", "HR"]), getAllDepartments);

module.exports = router;
