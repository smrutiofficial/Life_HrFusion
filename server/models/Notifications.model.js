const mongoose=require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  recipientType: { 
    type: String, 
    enum: ["employee", "HR", "admin", "all"], 
    required: true 
  }, // Who should receive this notification
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Only HR/Admin can send notifications
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model("Notification", notificationSchema);
