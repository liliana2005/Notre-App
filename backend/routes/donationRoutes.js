const express = require('express')
const {createDonation, getDonationsByUser, getDonationsByProject} = require('../controllers/donationController');
const validateToken = require("../middleware/validateToken");

const router = express.Router();

// Create a new donation
router.post('/', validateToken, createDonation);

 
// Get all donations by a specific user
router.get('/user/:userId', validateToken, getDonationsByUser);


// Get all donations for a specific project
router.get('/project/:projectId', getDonationsByProject);


module.exports = router;







