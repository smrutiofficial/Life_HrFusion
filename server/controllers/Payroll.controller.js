const Payroll =require("../models/Payroll.model.js");
const User =require("../models/Users.model.js");

// @desc Add payroll details for an employee
// @route POST /payroll/add
// @access Private (Admin/HR)
const addPayroll = async (req, res) => {
  try {
    const { userId, basicPay,payScale, allowances, deductions, ctc, epf } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if payroll exists for user
    const existingPayroll = await Payroll.findOne({ userId });
    if (existingPayroll) {
      return res.status(400).json({ message: "Payroll already exists for this user" });
    }

    const payroll = await Payroll.create({
      userId,
      basicPay,
      payScale,
      allowances,
      deductions,
      ctc,
      epf,
      status: "pending",
    });

    user.salaryDetails = payroll._id;
    await user.save();

    res.status(201).json({ message: "Payroll added successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get payroll details for a specific employee
// @route GET /payroll/:userId
// @access Private (Admin/HR)
// const getPayroll = async (req, res) => {
//   try {
//     const payroll = await Payroll.findOne({ userId: req.params.userId }).populate("userId", "name email position");
//     if (!payroll) return res.status(404).json({ message: "Payroll details not found" });

//     res.json(payroll);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };


// const getPayroll = async (req, res) => {
//   try {
//     const payroll = await Payroll.findOne({ userId: req.params.userId })
//       .populate({
//         path: "userId",
//         select: "name email",
//       })
//       .populate({
//         path: "userId",
//         populate: {
//           path: "profile",
//           select: "position department joinedDate contactNumber dateOfBirth gender",
//         },
//       });

//     if (!payroll) return res.status(404).json({ message: "Payroll details not found" });

//     res.json(payroll);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };





const getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findOne({ userId: req.params.userId })
      .populate({
        path: "userId",
        select: "name email",
      })
      .populate({
        path: "userId",
        populate: {
          path: "profile",
          select: "position department joinedDate contactNumber dateOfBirth gender",
        },
      });

    if (!payroll) return res.status(404).json({ message: "Payroll details not found" });

    // Rename userId to userProfile in the response
    const payrollData = payroll.toObject(); // Convert Mongoose document to plain object
    payrollData.userProfile = payrollData.userId; // Rename userId to userProfile
    delete payrollData.userId; // Remove the old key

    res.json(payrollData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// @desc Update payroll details for an employee
// @route PUT /payroll/update/:userId
// @access Private (Admin/HR)
const updatePayroll = async (req, res) => {
  try {
    const { basicpay, allowances, deductions, ctc, epf, gradePay,bankac,ifsc } = req.body;

    const updatedPayroll = await Payroll.findOneAndUpdate(
      { userId: req.params.userId },
      { basicpay, allowances, deductions, ctc, epf, gradePay,bankac,ifsc },
      { new: true }
    );

    if (!updatedPayroll) return res.status(404).json({ message: "Payroll details not found" });

    res.json({ message: "Payroll updated successfully", updatedPayroll });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Remove payroll details
// @route DELETE /payroll/delete/:userId
// @access Private (Admin)
const deletePayroll = async (req, res) => {
  try {
    const deletedPayroll = await Payroll.findOneAndDelete({ userId: req.params.userId });
    if (!deletedPayroll) return res.status(404).json({ message: "Payroll details not found" });

    await User.findByIdAndUpdate(req.params.userId, { salaryDetails: null });

    res.json({ message: "Payroll details removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get payroll details of all employees
// @route GET /payroll/all
// @access Private (Admin/HR)
const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("userId", "name email position");
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Process payroll and mark as paid
// @route POST /payroll/process/:payrollId
// @access Private (Admin)
const processPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.payrollId);
    if (!payroll) return res.status(404).json({ message: "Payroll details not found" });

    payroll.status = "paid";
    await payroll.save();

    res.json({ message: "Payroll processed successfully", payroll });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports= {
  addPayroll,
  getPayroll,
  updatePayroll,
  deletePayroll,
  getAllPayrolls,
  processPayroll,
};