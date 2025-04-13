const express = require('express');
const {
    getUsers,
    getOrganizations,
    updateUser, 
    deleteUser,
    updateOrganization,
    deleteOrganization, 
    approveOrganization,
    getDonations,
    updateDonationStatus,
    getStats
} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();
//User Routes
router.get('/users', adminMiddleware, getUsers);
router.put('/users/:id', adminMiddleware, updateUser);
router.delete('/users/:id', adminMiddleware, deleteUser);

//Organization Routes
router.get('/organizations', adminMiddleware, getOrganizations);
router.put('/organizations/:id', adminMiddleware, updateOrganization);
router.delete('/organizations/:id', adminMiddleware, deleteOrganization);
router.put('/organizations/:id/approve', adminMiddleware, approveOrganization);


//Donations Routes
router.get('/donations', adminMiddleware, getDonations);
router.put('/donations/:id/status', adminMiddleware, updateDonationStatus);

//Stats Route 
router.get('/stats', adminMiddleware, getStats);

module.exports = router;