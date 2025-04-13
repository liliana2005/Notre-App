const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Organization = require('../models/organization');
const Donation = require('../models/Donation');

//@desc Get all users 
//@route GET /api/admin/users
//@access Private (Admin only)
const getUsers = asyncHandler(async (req,res)=>{
    const  users = await User.find({}).select('-password');
    res.status(200).json(users);
});

//@desc Get all organizations
//@route GET /api/admin/organizations
//@access Private (Admin only)

const getOrganizations = asyncHandler(async (req, res) => {    const organozations= await Organization.find({});
    res.status(200).json(organizations);
});

//@desc Update a user
//@route PUT /api/admin/users/:id
//@access Private (Admin only)
const updateUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(400)
    throw new Error('User nit found')
   }
   //update user fields
   user.name = req.body.name || user.name;
   user.email = req.body.email || user.email;
   user.role = req.body.role || user.role;

   const updatedUser = await user.save();
   res.status(200).json(updatedUser);
});

//@desc Delete a user
//@route DELETE /api/admin/users/:id
//@access Private (Admin only
 const deleteUser = asyncHandler (async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(404);
        throw new Error('User not found');
    }
    await user.remove();
    res.status(200).json({message: 'User deleted successfully'});
 });

//@desc Update an organization
//@route PUT /api/admin/organizations/:id
//@access Private (Admin only)
 const  updateOrganization = asyncHandler(async (req,res)=>{
    const organization = await Organization.findById(req.params.id);

    if(!organization){
        res.status(404); 
        throw new Error('Organization not found');
    }
    //update organization fields
    organization.name = req.body.name || organization.name;
    organization.email = req.body.email || organization.email;
    organization.role = req.body.role || organization.role;
    organization.phone = req.body.phone || organization.phone;
    organization.address = req.body.address || organization.address;
    organization.description = req.body.description || organization.description;
    organization.status = req.body.status || organization.status;

    const updatedOrganization = await organization.save();
    res.status(200).json(updatedOrganization);
 });


//@desc Delete an organization
//@route DELETE /api/admin/organizations/:id
//@access Private (Admin only)
const deleteOrganization = asyncHandler(async (req,res)=>{
    const organization = await Organization.findById(req.params.id);

if(!organization){
    res.status(404);
    throw new Error('Organization not found');
}
await organization.remove();
     res.status(200).json({message:'Organization deleted successfully'});
});


//@desc Approve or reject an organization
//@route PUT /api/admin/organizations/:id/approve
//@access Private (Amin only)
const approveOrganization = asyncHandler(async (req,res)=>{
    const {status} =req.body;
    
    const organization = await Organization.findById(req.params.id);
    if(!organization){
        res.status(404);
        throw new Error ('Organization not found');
    }

    organization.status = status;
    const updatedOrganization = await organization.save();

    res.status(200).json(updatedOrganization);
});



//@desc Get all donations (with filters for projects/users)
//@route GET /aoi/admin/donations
//@access Private (Admin Only)
const getDonations = asyncHandler(async (req,res)=>{
    const donations = await Donation.find({})
       .populate('donor', 'name email')
       .populate('project', 'title');
       res.status(200).json(donations);
});

//@desc Update donation status
//@route PUT /api/admin/donations/:id
//@access Private (Admin Only)
const updateDonationStatus = asyncHandler(async (req,res)=>{
    const {status} = req.body;
    const donation = await Donation.findById(req.params.id);

    const validStatuses = ['pending', 'completed', 'failed'];
    if (! validStatuses.includes(status)){
        res.status(400);
        throw new Error('Invalid status. Allowed: pending, completed, failed');
    }
   
    if(!donation){
        res.status(404);
        throw new Error('Donation not found');
    }

    donation.status = status;
    await donation.save();
    res.status(200).json(donation);
});


//@desc Get counts of users, organizations, donations
//@route GET /api/admin/stats
//@access Private (Admin Only)
// example:"📊 125 Users | 42 Organizations | 💰 893 Donations ($52,450 Total)"
const getStats = asyncHandler(async (req,res)=>{
     const users = await User.countDocuments();
     const organizations = await Organization.countDocuments();
    const donations = await Donation.countDocuments();
const totalDonations = await Donation.aggregate([{ $group: { _id:null, total: { $sum: "$amount"} } } 
]);

    res.status(200).json({
        users, 
        organizations,
        donations,
        totalDonations: totalDonations[0]?.total || 0,
    s    });
});




module.exports = {
    getUsers,
    getOrganizations,
    updateUser,
    deleteUser,
    updateOrganization, 
    deleteOrganization, 
    approveOrganization, 
    getDonations, 
    updateDonationStatus, 
    getStats };

//totalDonations[0] - Why Index 0?....he aggregate() method always returns an ARRAY of results...Since we grouped ALL donations together, we only get ONE result in that array...[0] gets that first (and only) result from the array
//$group combines all donations into one group (since _id: null means "no grouping") and then calculates the total donation amount using $sum