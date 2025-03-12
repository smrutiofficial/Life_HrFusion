const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  // departmentId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true }, // Department name
  description: { type: String,default:""},
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Department", departmentSchema);
