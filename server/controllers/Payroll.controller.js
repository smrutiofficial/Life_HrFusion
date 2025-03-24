const Payroll = require("../models/Payroll.model.js");
const User = require("../models/Users.model.js");
const Profile = require("../models/Profile.model.js");

// @desc Get payroll details for a user
// @route GET /payroll/:userId
// @access Private (Admin/HR)
const getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findOne({
      userId: req.params.userId,
    }).populate({
      path: "userId",
      select: "name email",
      populate: {
        path: "profile",
        select:
          "position department joinedDate contactNumber dateOfBirth gender",
      },
    });

    if (!payroll)
      return res.status(404).json({ message: "Payroll details not found" });

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get all payroll details with user and profile data
// @route GET /payroll/all
// @access Private (Admin/HR)
const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate({
      path: "userId",
      select: "name email",
      populate: {
        path: "profile",
        select:
          "position department joinedDate contactNumber dateOfBirth gender",
      },
    });

    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update payroll details
// @route PUT /payroll/update/:userId
// @access Private (Admin/HR)
const updatePayroll = async (req, res) => {
  try {
    const { basicpay, allowances, deductions, ctc, epf, bankac, ifsc } =
      req.body;

    const updatedPayroll = await Payroll.findOneAndUpdate(
      { userId: req.params.userId },
      { basicpay, allowances, deductions, ctc, epf, bankac, ifsc },
      { new: true }
    );

    if (!updatedPayroll)
      return res.status(404).json({ message: "Payroll details not found" });

    res.json({ message: "Payroll updated successfully", updatedPayroll });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Add a new allowance
// @route POST /payroll/:userId/allowance
// @access Private (Admin/HR)
const addAllowance = async (req, res) => {
  try {
    const { type, amount } = req.body;

    const updatedPayroll = await Payroll.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { allowances: { type, amount } } },
      { new: true }
    );

    if (!updatedPayroll)
      return res.status(404).json({ message: "Payroll details not found" });

    res.json({ message: "Allowance added successfully", updatedPayroll });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Add a new deduction
// @route POST /payroll/:userId/deduction
// @access Private (Admin/HR)
const addDeduction = async (req, res) => {
  try {
    const { type, amount } = req.body;

    const updatedPayroll = await Payroll.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { deductions: { type, amount } } },
      { new: true }
    );

    if (!updatedPayroll)
      return res.status(404).json({ message: "Payroll details not found" });

    res.json({ message: "Deduction added successfully", updatedPayroll });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// @desc    Update an existing allowance for a user
// @route   PATCH /payroll/allowance/:userId/:allowanceId
// @access  Private

const updateAllowance = async (req, res) => {
  try {
    const { userId, allowanceId } = req.params;
    const { type, amount } = req.body;

    const payroll = await Payroll.findOneAndUpdate(
      { userId, "allowances._id": allowanceId },
      {
        $set: {
          "allowances.$.type": type,
          "allowances.$.amount": amount,
        },
      },
      { new: true }
    );

    if (!payroll) {
      return res.status(404).json({ message: "Allowance not found" });
    }

    res.json({ message: "Allowance updated successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Delete an allowance for a user
// @route   DELETE /payroll/allowance/:userId/:allowanceId
// @access  Private

const deleteAllowance = async (req, res) => {
  try {
    const { userId, allowanceId } = req.params;

    const payroll = await Payroll.findOneAndUpdate(
      { userId },
      { $pull: { allowances: { _id: allowanceId } } },
      { new: true }
    );

    res.json({ message: "Allowance deleted successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Update an existing deduction for a user
// @route   PATCH /payroll/deduction/:userId/:deductionId
// @access  Private

const updateDeduction = async (req, res) => {
  try {
    const { userId, deductionId } = req.params;
    const { type, amount } = req.body;

    const payroll = await Payroll.findOneAndUpdate(
      { userId, "deductions._id": deductionId },
      {
        $set: {
          "deductions.$.type": type,
          "deductions.$.amount": amount,
        },
      },
      { new: true }
    );

    if (!payroll) {
      return res.status(404).json({ message: "Deduction not found" });
    }

    res.json({ message: "Deduction updated successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Delete a deduction for a user
// @route   DELETE /payroll/deduction/:userId/:deductionId
// @access  Private

const deleteDeduction = async (req, res) => {
  try {
    const { userId, deductionId } = req.params;

    const payroll = await Payroll.findOneAndUpdate(
      { userId },
      { $pull: { deductions: { _id: deductionId } } },
      { new: true }
    );

    res.json({ message: "Deduction deleted successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getPayroll,
  getAllPayrolls,
  updatePayroll,
  addAllowance,
  updateAllowance,
  deleteAllowance,
  addDeduction,
  updateDeduction,
  deleteDeduction,
};
