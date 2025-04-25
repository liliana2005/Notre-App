const asyncHandler = require('express-async-handler');
const Donation = require('../models/Donation');
const Project = require('../models/Project'); 
const { notify } = require('./notificationController'); // Import the notify function

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private
const createDonation = asyncHandler(async (req, res) => {
    const {  project, amount, currency } = req.body;
    const donneur = req.user._id; 

    if (!donneur || !project || !amount ) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }
    // Validate project existence
    const projectExists = await Project.findById(project);
       if (!projectExists) {
          res.status(404);
          throw new Error('Project not found');
      }
      // Validate amount
     if (!amount || typeof amount !== 'number' || amount <=0) {
             res.status(400);
             throw new Error('Amount must be greater than 0');
         }
    

    // Create the donation
    const donation = await Donation.create({
        donneur,
        project,
        amount,
        currency: currency || 'DZD', // Add default currency
         status: 'pending', // Add payment status tracking
        donationDate: new Date() // Add timestamp
    });

    await Project.findByIdAndUpdate(project, {
             $inc: { totalDonations: amount }
         });
     
         await notify(
            'org',
            projectExists.user,  // ID of the organization that owns the project
            `💰 A user has donated ${amount} ${currency || 'DZD'} to your project "${projectExists.title}".`
          );

    res.status(201).json(donation);
});
 
// @desc    Get all donations by a specific user
// @route   GET /api/donations/user/:userId
// @access  Private
const getDonationsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // Fetch donations by user
    const donations = await Donation.find({ donneur: userId }).populate('project');
    res.status(200).json(donations);
});

// @desc    Get all donations for a specific project
// @route   GET /api/donations/project/:projectId
// @access  Public

const getDonationsByProject = asyncHandler(async (req, res) => {
    const projectId = req.params.projectId;

    // Fetch donations by project
    const donations = await Donation.find({ project: projectId }).populate('donneur');

    res.status(200).json(donations);
});


module.exports = {
    createDonation,
    getDonationsByUser,
    getDonationsByProject,
};