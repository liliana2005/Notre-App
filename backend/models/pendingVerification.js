const  mongoose = require('mongoose');

const pendingVerificationSchema = new mongoose.Schema({
   fullName : String,
   email: {type: String , unique: true },
   code : Number,
   expiresAt : Date,
   lastSentAt: {
      type: Date,
      default: Date.now, // Track when the code was last sent
    },
});

module.exports = mongoose.model('PendingVerification', pendingVerificationSchema);