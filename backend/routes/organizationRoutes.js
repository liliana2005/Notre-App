const express = require('express');

const{registerOrganization,loginOrganization,getOrganizationProfile,updateOrganizationProfile, deleteOrganizationAccount,listOrganizations} = require('../controllers/organizationController');
const validateToken = require("../middleware/validateToken");
const roleMiddleware = require("../middleware/roleMiddleware")

const router = express.Router();
 router.post('/register', registerOrganization);

 router.post('/login', loginOrganization);

 router.get('/profile',validateToken,getOrganizationProfile);

 router.put('/update', validateToken, updateOrganizationProfile );

 router.delete('/delete', validateToken, deleteOrganizationAccount);

 router.get('/', listOrganizations);

 module.exports = router;