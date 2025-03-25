const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  basicpay: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    required: true,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  bankac: { type: String, required: true, default: "00000000000" },
  ifsc: { type: String, required: true ,default: "SBIN0000000"},
  allowances: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],

  deductions: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],

  ctc: { type: Number, required: true },

  epf: {
    employeeContribution: { type: Number, required: true },
    employerContribution: { type: Number, required: true },
    uan: { type: String, unique: true },
  },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payroll", payrollSchema);
