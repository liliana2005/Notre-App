const mongoose = require('mongoose');

const pendingOrganizationSchema = new mongoose.Schema({

    name:{type :String, required:true},
    email:{type:String, required:true, unique:true},
    code:{type:Number, required:true},
    expiresAt:{type:Date, required:true},
    lastSentAt: {type:Date, required: true},
}); 

module.exports = mongoose.model('PendingOrganization', pendingOrganizationSchema);