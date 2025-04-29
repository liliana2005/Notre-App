const express = require('express');
const User = require('../models/User');
const Organization = require('../models/organization')

const router = express.Router();

// Save user Expo push token
router.post('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
  
    user.expoPushToken = req.body.token;
    await user.save();
  
    res.json({ message: "Token saved for user" });
  });
  
  // Save organization Expo push token
  router.post('/org/:id', async (req, res) => {
    const org = await Organization.findById(req.params.id);
    if (!org) return res.status(404).json({ message: "Organization not found" });
  
    org.expoPushToken = req.body.token;
    await org.save();
  
    res.json({ message: "Token saved for organization" });
  });
  
  module.exports = router;
  