const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//the Schema for the user
const UserSchema = new mongoose.Schema({
    
    fullName:{
        type:String,
        required:[true,'Please add the user fullName'],
    },
    email:{
        type:String,
        required:[true,'Please add the email address'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please add the password'],
    },
    profilePicture: {
        type: String,//TO STORE THE CLOUDINARY URL
        default: '',
    },
    phone :{type:Number,
        default: '',
    },  
    expoPushToken: String,
    notifications: [
        {
          message: String,
          read: { type: Boolean, default: false },
          timestamp: { type: Date, default: Date.now }
        }
      ],
   
    isAdmin: {
        type: Boolean,
        default: false, // Default to false (regular user)
    },
    joinedTime:{
        type: Date,
        default :Date.now
    },
    role:{
        type: String,
        enum:["donor","organization"],
        default:"donor"//default role is donor
    },
    emailVerified:{type:Boolean, default:false},
    emailVerificationCode: {
        code: String,
        expiresAt: Date
      },
      
    //Password reset fields
    resetCode : Number,
    resetCodeExpires : Date
   
},{timestamps:true}) ;


//

//Hash the password before saving the user
//.this:refers to the user instance that we are trying to create


UserSchema.pre('save', async function(next){
       //salt: ajoute string unique random au mot de passe avant son hashage
   if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
    next();
       //It calls next() to continue saving the user in the database.
})
module.exports = mongoose.model("User",UserSchema);