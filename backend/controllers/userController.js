const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cloudinary = require('../config/cloudinary'); // adapte le chemin si besoin

// @desc Get User Information
// @route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    joinedTime: user.joinedTime,
    profilePicture: user.profilePicture,
  });
});

// @desc Update User Profile
// @route PUT /api/user/update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { fullName, phone, profilePicture } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.fullName = fullName || user.fullName;
  user.phone = phone || user.phone;
  user.profilePicture = profilePicture || user.profilePicture;

  await user.save();
  res.status(200).json({ message: "User updated successfully", user });
});

// @desc Upload user profile picture
// @route POST /api/user/upload-profile-picture
// @access Private
const uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided." });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    // Update user's profilePicture URL
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.profilePicture = result.secure_url;
    await user.save();

    // Delete the temporary file from server
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    res.status(200).json({
      message: "Profile picture updated successfly",
      profilePicture: result.secure_url,
      //url: result.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

// @desc Get current user info
// @route GET /api/user/me
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// @desc Delete User Account
// @route DELETE /api/user/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User account deleted successfully" });
});

// @desc Change Password
// @route PUT /api/user/change-password
// @access Private
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect old password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

module.exports = {
  getUserProfile,
  updateUser,
  deleteUser,
  changePassword,
  uploadProfilePicture,
  getCurrentUser
};
