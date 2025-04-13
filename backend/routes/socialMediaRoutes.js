const express = require('express');
const router = express.Router();

const { updateSocialMedia } = require('../controllers/socialMediaController');
const validateToken = require('../middleware/validateToken');

// @route   PUT /api/social-media
// @desc    Update organization's social media links
// @access  Private
router.put('/', validateToken, updateSocialMedia);

module.exports = router;