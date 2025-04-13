const Organization = require('../models/organization');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');

//@desc Register an organization 
//@route POST /api/organization/register
//@access Public
const registerOrganization = asyncHandler(async(req,res)=>{
    const{name, email, phone, address, description, password} =req.body;

    const organizationExists = await Organization.findOne({email});
    if(organizationExists){
        return res.status(400).json({message:'Oragnization already exists'});
      }

      //Create new organization
      const organization = new Organization({
        name,email, phone, address, description, password
      });
      await organization.save();
      const token = organization.generayeAuthToken();

      res.status(201).json({
        _id: organization._id,
        name: organization.name,
        email: organization.email,
        token
      });
});

//@desc Login organization
//@route POST /api/organization/login
//@access Public
const loginOrganization = asyncHandler(async(req,res)=>{
    const{email, password}= req.body;
    
    const organization = await Organization.findone({email});
    if(!orgnaization){
        return res.status(400).json({message:'Invalid email or password'});
    }

    //Check password
    const isMatch = await organization.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid email or password '});
    }

    const token = organization.generateAuthToken();

    res.status(200).json({
    _id: organization._id,
    name: organization.name,
    email: organization.email,
    token
    });
});

//@desc Get organization details 
//@route GET /api/organizations/profile
//@access Private
const getOrganizationProfile = asyncHandler(async (req,res)=>{
    const organization = await Organization.findById(req.organization._id).select('-password');

    if(!organization){
        return res.status(400).json({message:'Organization not found'})
    }
    res.status(200).json(organization);
});

//@desc Update organization profile
//@route PUT /api/organizations/update
//@access Private

const updateOrganizationProfile = asyncHandler(async(req,res)=>{
    const {name, phone,  address, description} = req.body;

    const organization = await Organization.findById(req.organization._id);
    if(!organization){
        return res.status(400).json({message:'Organization not found'});
    }

    organization.name = name || organization.name;
    organization.phone = phone || organization.phone;
    organization.address= address || organization.address;
    organization.description = description || organozation.description;

    await organization.save();
    response.status(200).json({message:'Organization updated successfuly', organization});
});

//@desc Delete organization account 
//@route DELETE /api/organizations/delete
//@access Private
const deleteOrganizationAccount = asyncHandler (async (req,res)=>{
    const organization = await Organization.findByIdAndDelete(req.organization._id);
    if(!organization){
        return res.status(404).json({message:'Organization not found'});
    }

    res.status(200).json({message:'Organization account deleted successfully'});
});

//@desc List all organizations
//@route GET /api/organizations
//@access Public
const listOrganizations = asyncHandler (async (req,res)=>{
    const organizations = await Organization.find({}).select('-password');
    res.status(200).json(organizations);
});

module.exports = {
    registerOrganization,
    loginOrganization,
    getOrganizationProfile,
    updateOrganizationProfile,
    deleteOrganizationAccount,
    listOrganizations
};