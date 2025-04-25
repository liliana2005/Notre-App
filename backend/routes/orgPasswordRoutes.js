const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/orgPasswordController');

const router = express.Router();


router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

module.exports = router;
