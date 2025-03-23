const Profile = require("../models/Profile.model");
const User = require("../models/Users.model");
// @desc Create a new profile
// @route POST /profile
// @access Private (User)
const createProfile = async (req, res) => {
  try {
    const {
      userId,
      position,
      department,
      joinedDate,
      contactNumber,
      dateOfBirth,
      gender,
      maritalStatus,
      aadharCard,
      panCard,
    } = req.body;

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = new Profile({
      userId,
      position,
      department,
      joinedDate,
      contactNumber,
      dateOfBirth,
      gender,
      maritalStatus,
      aadharCard,
      panCard,
    });

    await profile.save();
    res.status(201).json({ success: true, profile });
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get profile by user ID
// @route GET /profile/:userId
// @access Public
// const getProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const profile = await Profile.findOne({ userId });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.json(profile);
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// Get user data
const getCurrentUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    console.log({ id });

    const profile = await Profile.findOne({ userId: id }).populate({
      path: "userId",
      select: "email name role", // Only fetch email from the User model
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Convert Mongoose document to an object and merge email
    const profileWithEmail = {
      ...profile.toObject(),
      email: profile.userId.email,
    };

    res.status(200).json(profileWithEmail);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOne({ userId }).populate({
      path: "userId",
      select: "email name role", // Only fetch email from the User model
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Convert Mongoose document to an object and merge email
    const profileWithEmail = {
      ...profile.toObject(),
      email: profile.userId.email,
    };

    res.status(200).json(profileWithEmail);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// @desc Update profile
// @route PUT /profile/:userId
// @access Private (User)
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    let profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete profile
// @route DELETE /profile/:userId
// @access Private (User/Admin)
const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get current user's profile
// @route GET /profile/me
// @access Private (User)
// const getCurrentUserProfile = async (req, res) => {
//   try {
//     console.log(req.user.id);

//     const userId = req.user.id; // Ensure it's an ObjectId

//     const profile = await Profile.findOne({ userId }).populate({
//       path: "userId",
//       select: "email name role"
//     });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.status(200).json({
//       success: true,
//       profile: {
//         ...profile.toObject(),
//         email: profile.userId.email
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching current user profile:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const getCurrentUserProfile = async (req, res) => {
//   try {
//     console.log("req.user inside getCurrentUserProfile:", req.user); // Debugging

//     if (!req.user) {
//       return res.status(401).json({ msg: "Unauthorized: req.user is undefined" });
//     }

//     res.json(req.user);
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     res.status(500).json({ msg: "Server error while fetching user data" });
//   }
// };

// Export controllers
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getCurrentUserProfile,
};
