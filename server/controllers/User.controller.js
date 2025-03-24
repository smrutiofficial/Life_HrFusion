const User = require("../models/Users.model");
const Profile = require("../models/Profile.model");
const Payroll = require("../models/Payroll.model");
const Attendance = require("../models/Attendance.model");
const Leave = require("../models/Leave.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { transporter } = require("../config/nodemailer");
const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("../middlewares/EmailTemplate.middleware");

dotenv.config();
// Generate a 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Email
const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: `Life Hrfusion <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification OTP",
    text: `Your OTP for verification is: ${otp}. It expires in 5 minutes.`,
    html: Verification_Email_Template.replace("{verificationCode}", otp),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if OTP matches and is not expired
    if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt) {
      // await User.deleteOne({ email }); // ❌ Delete user if OTP is incorrect or expired
      return res
        .status(400)
        .json({ message: "Invalid OTP. Registration failed." });
    }

    // OTP is correct: Update user as verified
    user.emailVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    user.isAccountVerified = true;

    const sendWelcomeEmail = {
      from: `Life Hrfusion <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Life Hrfusion!",
      // text: `Hi ${user.name},\n\nWelcome to Life Hrfusion! We’re excited to have you onboard.\n\nYour registration is successful, and you’re all set to explore.Your hrms id is ${user.userId}.`,
      html: Welcome_Email_Template.replace("{name}", user.name).replace(
        "{userId}",
        user.userId
      ),
    };

    await transporter.sendMail(sendWelcomeEmail);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Register a new user
// @route POST /users/register
// @access Public
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const generateUserId = () => {
//       const id = 7000000 + Math.floor(Math.random() * 1000000);
//       // console.log("Generated User ID:", id); // Debugging log
//       return id;
//     };
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 6);

//     // Explicitly generate a userId
//     const userId = generateUserId();

//     const otp = generateOtp();
//     const otpExpireTime = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

//     // Create a new user
//     const user = new User({
//       userId, // Assign userId explicitly
//       name,
//       email,
//       password: hashedPassword,
//       verifyOtp: otp,
//       verifyOtpExpireAt: otpExpireTime,
//     });

//     await user.save();
//     await sendOtp(email, otp);

//     res
//       .status(201)
//       .json({ success: true, message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during user registration:", error); // Log the error for debugging
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const generateUserId = () => {
      return 7000000 + Math.floor(Math.random() * 1000000);
    };

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 6);
    const userId = generateUserId();
    const otp = generateOtp();
    const otpExpireTime = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Create a new user
    const user = new User({
      userId,
      name,
      email,
      password: hashedPassword,
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpireTime,
    });

    await user.save();
    await sendOtp(email, otp);
    // ---------------------------------------------------------
    // **Automatically Create Profile**
    const profile = new Profile({
      userId: user._id, // Reference to User model
      position: "Not Set",
      department: "Not Set",
      joinedDate: new Date(),
      contactNumber: "Not Set",
      dateOfBirth: null,
      gender: "Other",
      maritalStatus: "Single",
      aadharCard: "Not Set",
      panCard: "Not Set",
    });

    await profile.save();
    // -------------------------------------------------
    // **Automatically Create Payroll**
    const payroll = new Payroll({
      userId: user._id,
      basicpay: 0,
      bankac: "00000000000",
      ifsc: "SBIN0000000",
      allowances: [], // Empty array initially
      deductions: [], // Empty array initially
      ctc: 0,
      epf: {
        employeeContribution: 0,
        employerContribution: 0,
        uan: `UAN${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random UAN
      },
      updatedAt: new Date(),
    });

    await payroll.save();
    // -------------------------------------------------------
    // **Automatically Create Attendance**
    const attendance = new Attendance({
      userId: user._id,
      attendance: [],
    });

    await attendance.save();
    // ---------------------------------------------------------
    // **Automatically Create Leave Record (Default)**
    const leave = new Leave({
      userId: user._id,
      leaves: [],
    });

    await leave.save();
    // ----------------------------------------------
    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Profile, Payroll, Attendance, and Leave records created.",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc Authenticate user & get JWT token
// @route POST /api/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc logout user
// @route
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.json({ success: true, message: "Loged Out" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update user details
// @route PUT /users/update/:userId
// @access Private (HR/Admin)
const updateUser = async (req, res) => {
  try {
    const { uname, email } = req.body;
    if (!uname && !email) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { ...(uname && { name: uname }), ...(email && { email }) },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Delete user
// @route DELETE /users/delete/:userId
// @access Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get all users
// @route GET /users/all
// @access Private (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Request password reset
// @route POST /users/reset-password
// @access Public
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = Math.random().toString(36).slice(2, 12);
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 min expiration
    await user.save();

    res.json({ message: "Password reset token generated", resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Verify email using OTP
// @route POST /users/verify-email
// @access Public
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, emailOTP: otp });

    if (!user) return res.status(400).json({ message: "Invalid OTP" });

    user.emailVerified = true;
    user.emailOTP = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUsers,
  requestPasswordReset,
  verifyEmail,
};
