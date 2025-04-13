const asyncHandler = require('express-async-handler');

const Organization = require('../models/organization');

//@desc Update organization social media links
//@route PUT /api/social-media
//@access Private
const updateSocialMedia = asyncHandler(async (req,res)=>{
    const{organizationId,  socialMedia} =req.body;
     
    if(!organizationId|| !socialMedia){
        res.status(400);
        throw new Error('Please provide all required fileds');
    }

    const updatedProfile = await Organization.findByIdAndUpdate(
        organizationId,
        { socialMedia },
        { new: true }
    );

    if (!updatedProfile) {
        res.status(404);
        throw new Error('Organization not found');
    }   
    
    res.status(200).json({
        message:'Socil media links updated successfully',
        socialMedia: updatedProfile.socialMedia,
    });
});

module.exports = {updateSocialMedia};