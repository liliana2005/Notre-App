//→ Signup/Login logic
//#user authentification logic
const User = require('../models/User');
const bcrypt = require('bcryptjs');//library used to hash passwords
const jwt = require('jsonwebtoken');//library used to generate authentification token
const asyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer');
const PendingVerification = require('../models/pendingVerification');//model for pending verification



const transporter = nodemailer.createTransport({
    service:'Gmail',
       auth:{
           user: process.env.EMAIL_USER,//your gmail address
           pass: process.env.EMAIL_PASS//app password(not yoyr real password)
       }

});

//generate random 6-digit verification code
const generateVerificationCode = () => Math.floor(100000 + Math.random()* 900000 );


// @desc Send verification code to user during signup
// @route POST /api/auth/send-verification-code
//@access Public
const sendVerificationCode = asyncHandler(async (req,res)=>{
    const { fullName , email } = req.body;
    if( !fullName || !email ){
        res.status(400);
        throw new Error("this fields:( fullName , email)must be provided")
    }

    let existingUser = await User.findOne({email});//verify if the user already exists
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
      
    //Create verification code 
   

    let pending = await PendingVerification.findOne({ email });
    
    if (pending && pending.expiresAt < Date.now()) {
      await PendingVerification.deleteOne({ email });
      pending = null;
    }
   
    if (pending && Date.now() - new Date(pending.lastSentAt).getTime() < 60 * 1000) {
      const waitTime = Math.ceil(
        (60 * 1000 - (Date.now() - new Date(pending.lastSentAt).getTime())) / 1000
      );
      return res.status(429).json({ message: `Please wait ${waitTime}s before requesting a new code.` });
    }

    const verificationCode = generateVerificationCode();

    if (pending) {
        pending.code = verificationCode;
        pending.expiresAt = Date.now() + 10 * 60 * 1000;
        pending.lastSentAt = Date.now();
      } else {
        pending = new PendingVerification({
          fullName,
          email,
          code: verificationCode,
          expiresAt: Date.now() + 10 * 60 * 1000,
          lastSentAt: Date.now(),
        });
      }
      await pending.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:' Khair-DZ - Signup Verification Code', 
      text: `Welcome to Khair-DZ! \nYour verification code is: ${verificationCode} \nThis code will expire in 10 minutes`
    };


    await transporter.sendMail(mailOptions);
    res.status(201).json({message : "User registered. A verification code has been sent to your email."})

});
  
// @desc Complete signup after verifying code and creating password
// @route POST /api/auth/complete-signup
// @access Public
const completeSignup = asyncHandler(async (req, res) => {
    const { fullName ,email, code, password, confirmPassword } = req.body;

    if ( !fullName || !email || !code || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required." });
      }
    
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }
     
      const pending = await PendingVerification.findOne({ email });

      //if (!pending || pending.code !== Number(code) || pending.expiresAt < Date.now()) {
        if (!pending || String(pending.code) !== String(code) || pending.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired verification code." });
      }


      
      
     {/* const newUser = new User({
         fullName : pending.fullName,
         email: pending.email,
         password,
         emailVerified: true, // optional
       });*/}
       

      const newUser = new User({
       fullName : pending.fullName,
       email: pending.email.toLowerCase(),
       password,
       emailVerified: true,
      });


      try {
        await newUser.save();
        console.log("User saved successfully");
      } catch (error) {
        console.error("Error saving user:", error);
      }
      await PendingVerification.deleteOne({ email });
    
     // res.status(201).json({ message: "Signup successful!" });
     const token = jwt.sign({ id: newUser._id, role: newUser.role } , process.env.ACCESS_TOKEN_SECRET, {

       expiresIn: "1h",
    });
    
    res.status(201).json({ 
      message: "Signup successful!",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        // include other fields if needed
      }
    });
    
    }); 


//@desc Login user & return token
//@route POST /api/auth/login
//@access Public
const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("email and password are required")
    }

    const normalizedEmail = email.toLowerCase(); 
    let user = await User.findOne({email:normalizedEmail});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
        return res.status(400).json({message:"email or password are not valid"});
     }
     //TOKEN:Header , Plauload , signature
    const token = jwt.sign({id: user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
       //generate a token and sent it the user after they successfully log in
    res.json({token, 
        user:{
             id:user.id,
             fullName : user.fullName , 
             email: user.email,
            
              phone: user.phone
            }
        });
});



//@desc Logout user (Clear token on client side)
//@route POST /api/auth/logout
//@access Private

const logout= (req,res)=>{
    res.status(200).json({message:"User logged out successfully"});
};





module.exports ={sendVerificationCode,completeSignup,login,logout};