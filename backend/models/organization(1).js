const mongoose = require("mongoose");
const bcrypt = require ("bcryptjs");

const organizationSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String },
    address:{type:String},
    expoPushToken: String,
    description:{type:String},
    password:{type:String, required: true},
    profilePicture:{type: String, default:""},
    role:{type:String, default:"organization"},
    createdAt:{type:Date, default:Date.now},
    socialMedia: {
        facebook: {type: String, default:""},
        twitter:{type:String, default:""},
        instagram:{type: String, default:""},
        linkedin:{type: String, default:""},
    },
    notifications: [
        {
          message: String,
          read: { type: Boolean, default: false },
          timestamp: { type: Date, default: Date.now }
        }
      ],
    status:{type:String, enum:['pending', 'approved', 'rejected'], default:'pending'},
    logo:{type: String, default:''},
    resetCode: Number,
    resetCodeExpires: Date,
});

organizationSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
   
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();

});

const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);
module.exports = Organization;
