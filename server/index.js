const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require("node-cron");
const { autoDeleteExpiredNotifications } = require("./controllers/Notification.controller.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Set your frontend URL
    // origin: "http://192.168.51.97:3000", // ✅ Set your frontend URL
    credentials: true, // ✅ Allow cookies
  })
);

// Routes
app.use("/user/", require("./routers/Users.route.js"));
app.use("/payroll/", require("./routers/Payroll.route.js"));
app.use("/leave/", require("./routers/leave.route.js"));
app.use("/notification/", require("./routers/Notification.route.js"));
app.use("/attendance/", require("./routers/Attendance.route.js"));
app.use("/profile/", require("./routers/Profile.route.js"));

// Run auto-delete every hour
cron.schedule("0 * * * *", () => {
  console.log("Running notification cleanup...");
  autoDeleteExpiredNotifications();
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on port http://localhost:${PORT}`)
);
