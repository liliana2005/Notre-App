const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// @desc Get User Information
// @route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user.id).select("-password");//Exclude password

  if(!user){
    res.status(404).json({message:"User not found"});
  }
     res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        gender:user.gender,
        phone:user.phone,
        joinedTime: user.joinedTime
     })
});


// @desc Update User Profile
// @route PUT /api/user/update
// @access Private
const updateUser = asyncHandler(async (req,res)=>{
  const {fullName , phone }= req.body;

  const user = await User.findById(req.user.id);
  if(!user){
      return res.status(404).json({message:"User not found"});
  }
 
  
  user.fullName = fullName || user.fullName;
  user.phone = phone || user.phone;

  await user.save();
  res.status(200).json({message:"User updated successfully" , user})

})

// @desc Delete User Account
// @route DELETE /api/user/delete
// @access Private
const deleteUser = asyncHandler(async (re,res)=>{
  const user = await User.findByIdAndDelete(req.user.id);

  if(!user){
      return res.status(404).json({message:"User not found"});
  }

  res.status(200).json({message:"User acount deleted successfully"});
});

// @desc Change Password
// @route PUT /api/user/change-password
// @access Private
const changePassword = asyncHandler(async (req,res)=>{
  const{oldPassword , newPassword}= req.body;

  const user = await User.findById(req.user.id);
  if(!user){
      return res.status(404).json({message:"User not found"});
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if(!isMatch){
      return res.status(400).json({message:"Incorrect old password"});
  }

  user.password = await bcrypt.hash(newPassword,10);
  await user.save();
  
  res.status(200).json({message:"Password changed successfully"});
});

module.exports = {getUserProfile , updateUser , deleteUser , changePassword};


