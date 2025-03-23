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

// @desc Get current login user profile profile
// @route PUT /profile/user/me
// @access Private (User)
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
// @desc Get profile by id
// @route PUT /profile/:userId
// @access Private (User)
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
// @desc Get all employees profile profile
// @route PUT /profile/employees
// @access Private (User)
const getEmployees = async (req, res) => {
  try {
    const { role } = req.params; // Extract role from URL params

    // Define role filter
    const roleFilter = role === "all" ? {} : { role }; // Fetch all if "all", otherwise filter by role

    const users = await Profile.find()
      .populate({
        path: "userId",
        match: roleFilter, // Dynamically match based on role
        select: "email name role",
      })
      .lean(); // Convert Mongoose documents to plain objects

    // Filter out profiles where `userId` is null (i.e., user is not an employee)
    const filteredEmployees = users
      .filter(profile => profile.userId)
      .map(profile => ({
        ...profile,
        email: profile.userId.email, // Merging email into profile object
      }));

    res.status(200).json(filteredEmployees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
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


// Export controllers
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getEmployees,
  getCurrentUserProfile,
};
