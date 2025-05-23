const express = require('express');
const validateOrgToken = require("../middleware/validateOrgToken");
const{registerOrganization, changeOrganizationPassword, getOrganizationProfile,updateOrganizationProfile, deleteOrganizationAccount,listOrganizations} = require('../controllers/organizationController');

const roleMiddleware = require("../middleware/roleMiddleware")

const router = express.Router();
 //router.post('/register', registerOrganization);


 router.get('/profile',validateOrgToken, getOrganizationProfile);

 router.put('/update',validateOrgToken,  updateOrganizationProfile );

 router.delete('/delete', validateOrgToken, deleteOrganizationAccount);

 router.put('/change-password', validateOrgToken, changeOrganizationPassword);
 
 router.get('/', listOrganizations);

 module.exports = router;