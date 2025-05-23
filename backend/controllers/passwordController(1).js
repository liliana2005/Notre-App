const nodemailer = require('nodemailer');
const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

    //transporter is an object created to manage the connection to the email service'Gmail' and sending mails
const transporter = nodemailer.createTransport({//un objet qui gere l'envoi des emails
       service:'Gmail',
       auth:{
           user: process.env.EMAIL_USER,//your gmail address
           pass: process.env.EMAIL_PASS//app password(not yoyr real password)
       }
});


//Generate a andom 6-digits verification code
const generateVerificationCode = ()=> Math.floor(100000 + Math.random()*900000);//[100000-999999]

//@desc Forget Password- Send verification code
//@route POST /api/auth/forgot-password
//@Access Public

const forgotPassword = asyncHandler(async (req,res)=>{
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    //Generate and store verification code in tha dataBase
    const verificationCode = generateVerificationCode();
    user.resetCode = verificationCode;
    user.resetCodeExpires = Date.now()+15*60*1000; //code expires in 15mim= 15 min × 60 s × 1000 ms
    
    await user.save();


    //Send email

    const mailOptions= {
        from : process.env.EMAIL_USER,
        to : user.email,
        subject: 'Password Reset Code',
        text:`Your password reset code is: ${verificationCode}. This code will expire in 15 min.`
    };
     await transporter.sendMail(mailOptions);

     res.json({message:"Verification code sent to email"})
});

//@desc Verify Code & Reset Password
//@route POST /api/auth/reset-password
//@access Public

const resetPassword = asyncHandler(async (req,res)=>{
    const {email ,verificationCode , newPassword } = req.body;
    
    const user=  await User.findOne({email});

    if(!user || user.resetCode !==Number(verificationCode) || user.resetCodeExpires <Date.now()){
        return res.status(400).json({message:"Invalid or expired verification code"})
    }

    //Reset password 
    user.password = await bcrypt.hash(newPassword ,10);
    user.resetCode = null;
    user.resetCodeExpires = null ;
    await user.save();

    res.status(200).json({message:"Password reset successfully"});
})  ;

module.exports = {forgotPassword, resetPassword};
   