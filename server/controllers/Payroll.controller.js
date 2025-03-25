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
// @desc Get payroll details for employees based on role
// @route GET /payroll/:role
// @access Private (Admin/HR)
const getAllEmployeePayroll = async (req, res) => {
  try {
    const { role } = req.params; // Extract role from URL params

    let query = {}; // Default: No filter (fetch all)

    // Filter based on the role
    if (role !== "all") {
      query = { "userId.role": role }; // Match the user role
    }

    const payrolls = await Payroll.find()
      .populate({
        path: "userId",
        select: "name email role",
        populate: {
          path: "profile",
          select:
            "position department joinedDate contactNumber dateOfBirth gender",
        },
      })
      .then((payrolls) =>
        payrolls.filter((p) => role === "all" || p.userId.role === role)
      ); // Apply role filtering manually

    if (!payrolls.length)
      return res.status(404).json({ message: "No payroll records found" });

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
    const { basicpay, allowances, deductions, ctc, epf, bankac, ifsc, status } =
      req.body;

    const updatedPayroll = await Payroll.findOneAndUpdate(
      { userId: req.params.userId },
      { basicpay, allowances, deductions, ctc, epf, bankac, ifsc, status },
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




// @desc Get current login user profile with payroll
// @route PUT /profile/user/me
// @access Private (User)
const getCurrentUserProfileWithPayroll = async (req, res) => {
  try {
    const { id } = req.user; // Extract user ID from request
    console.log({ id });

    // Fetch user profile and populate necessary fields
    const profile = await Profile.findOne({ userId: id }).populate({
      path: "userId",
      select: "email name role avatar hrmsId username",
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Fetch payroll details separately using userId
    const payroll = await Payroll.findOne({ userId: id }).select(
      "basicpay bankac ifsc allowances ctc deductions "
    );

    // Construct response object
    const profileWithPayroll = {
      ...profile.toObject(),
      email: profile.userId.email,
      payroll: payroll || null, // Ensure payroll is included, even if it's null
    };

    res.status(200).json(profileWithPayroll);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};


module.exports = {
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
};
