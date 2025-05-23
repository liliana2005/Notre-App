const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Project = require('../models/Project');
const User = require('../models/User');
const Organization = require('../models/organization');
const fs = require('fs');

//@desc Upload file (profile picture, project image, organization logo, etc)
//@route POST /api/upload
//@access Private
const handleUpload = asyncHandler(async (req,res)=>{
    const file = req.file;
    const { type, projectId, organizationId} = req.body;
    const userId = req.user.id;

    if(!file){
        res.status(400);
        throw new Error('Please upload a file');
    }

    //Validate the size (5MB)
    if (file.size > 5*1024*1024){
        res.status(400);
        throw new Error('File size must be less than 5MB');
    }

    //Determine the file based on the upload type
    let folder;
    switch(type){
        case 'profile':
            folder = 'khair-dz/profile-pictures';
            break;
        case 'project':
            folder = 'khair-dz/project-images';
            break;
        case 'organization':
            folder = 'khair-dz/organization-logos';
            break;
        default:
            res.status(400);
            throw new Error('Invalid upload type');
    }


    //Upload the file to cloudinary
    const result = await cloudinary.uploader.upload(file.path, {folder});

    //save the image URL to the appropriate schema 
    switch (type){
        case 'profile':
            if(!userId){
                res.status(400);
                throw new Error('User ID is required');
            }
            await User.findByIdAndUpdate(userId, {profilePicture:result.secure_url});
            break;

        case 'project':
            if(!projectId){
                res.status(400);
                throw new Error('Project Id is required');
            }
            await Project.findByIdAndUpdate(projectId, {imageUrl:result.secure_url});
            break;

            case 'organization':
                if(!organizationId){
                    res.status(400);
                    throw new Error('Organization ID is required ');
                }
                await Organization.findByIdAndUpdate(organizationId, {logo: result.secure_url});
                break;

                default:
                    res.status(400);
                    throw new Error('Invalid upload type');
    }

    //  Delete the temporaray file from the server
    fs.unlinkSync(file.path);

    res.status(200).json({message:'File uploaded successfully', url:result.secure_url});

});


module.exports = {handleUpload};  