const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donneur :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //ref to the user model
    required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', 
        required: true,
    },
    amount: {type: Number, required: true},
    currency: {type: String, default: 'DZD'},
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'], // Donation status
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Donation', donationSchema);