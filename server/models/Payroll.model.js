const mongoose= require("mongoose");

const payrollSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  basicPay: { type: Number, required: true },
  payScale: { type: String, required: true },

  allowances: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],

  deductions: [
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],

  ctc: { type: Number, required: true },

  epf: {
    employeeContribution: { type: Number, required: true },
    employerContribution: { type: Number, required: true },
    uan: { type: String, required: true, unique: true }
  },

  updatedAt: { type: Date, default: Date.now }
});

module.exports=mongoose.model("Payroll", payrollSchema);
