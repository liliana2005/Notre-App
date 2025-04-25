const nodemailer = require('nodemailer');
const Organization = require('../models/Organization');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');


// Configure transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Generate 6-digit code
  const generateVerificationCode = () =>
    Math.floor(100000 + Math.random() * 900000);

  // @desc Org forgot password
// @route POST /api/org-auth/forgot-password
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const org = await Organization.findOne({ email });
  
    if (!org) {
      return res.status(400).json({ message: 'Organization not found' });
    }
  
    const verificationCode = generateVerificationCode();
    org.resetCode = verificationCode;
    org.resetCodeExpires = Date.now() + 15 * 60 * 1000;
  
    await org.save();
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Organization Password Reset Code',
      text: `Your reset code is: ${verificationCode}. It expires in 15 minutes.`,
    };
  
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset code sent to email.' });
  });

  // @desc Reset organization password
// @route PUT /api/org-auth/reset-password
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    const org = await Organization.findOne({ email });
  
    if (
      !org ||
      org.resetCode !== Number(verificationCode) ||
      org.resetCodeExpires < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }
  
    org.password = await bcrypt.hash(newPassword, 10);
    org.resetCode = null;
    org.resetCodeExpires = null;
    await org.save();
  
    res.status(200).json({ message: 'Password reset successfully' });
  });
  
  module.exports = {
    forgotPassword,
    resetPassword,
  };
  
