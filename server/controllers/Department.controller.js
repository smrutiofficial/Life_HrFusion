const Department = require("../models/Department.model");
const mongoose = require("mongoose");

// @desc Add a new department
// @route POST /departments/add
// @access Private (Admin)
const addDepartment = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    // Check if department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists" });
    }

    // Create and save the department
    const department = new Department({
      // departmentId: new mongoose.Types.ObjectId().toString(),
      userIds: userId ? [userId] : [],
      name,
      description,
    });
    await department.save();

    res
      .status(201)
      .json({ message: "Department added successfully", department });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get department details
// @route GET /departments/:departmentId
// @access Private (Admin/HR)
const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update department information
// @route PUT /departments/update/:departmentId
// @access Private (Admin)
const updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.departmentId,
      { name, description },
      { new: true }
    );

    if (!updatedDepartment)
      return res.status(404).json({ message: "Department not found" });

    res.json({ message: "Department updated successfully", updatedDepartment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Delete a department
// @route DELETE /departments/delete/:departmentId
// @access Private (Admin)
const deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(
      req.params.departmentId
    );
    if (!deletedDepartment)
      return res.status(404).json({ message: "Department not found" });

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get all departments
// @route GET /departments/all
// @access Private (Admin/HR)
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
};
