const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Organization = require("../models/organization");
const PendingOrganization = require("../models/pendingOrganization");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //generate random 6-digit verification code
const generateVerificationCode = () => Math.floor(100000 + Math.random()* 900000 );


// @desc Send verification code to Organization during signup
// @route POST /api/orgAuth/send-verification-code
//@access Public
const sendVerificationCode = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400);
      throw new Error("Full name and email are required");
    }
    const existingOrg = await Organization.findOne({ email });
  if (existingOrg) {
    res.status(400);
    throw new Error("Organization already exists");
  }

  let pending = await PendingOrganization.findOne({ email });

  if (pending && pending.expiresAt < Date.now()) {
    await PendingOrganization.deleteOne({ email });
    pending = null;
    }

 if (pending && Date.now() - new Date(pending.lastSentAt).getTime() < 60 * 1000) {
        const waitTime = Math.ceil((60 * 1000 - (Date.now() - new Date(pending.lastSentAt).getTime())) / 1000);
        return res.status(429).json({ message: `Please wait ${waitTime}s before requesting a new code.` });
     }
    
    const code = generateVerificationCode();

    if (pending) {
        pending.code = code;
        pending.expiresAt = Date.now() + 10 * 60 * 1000;
        pending.lastSentAt = Date.now();
      } else {
        pending = new PendingOrganization({
          name,
          email,
          code,
          expiresAt: Date.now() + 10 * 60 * 1000,
          lastSentAt: Date.now(),
        });
      }

      await pending.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Khair-DZ Organization Verification",
        text: `Your verification code is: ${code} (expires in 10 minutes)`,
      };
    
      
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "Verification code sent to email." });
});

// @desc Complete signup after verifying code and creating password
// @route POST /api/orgAuth/complete-signup
// @access Public

const completeSignup = asyncHandler(async (req, res) => {
    const { name , email, code, password, confirmPassword, phone, documentationLink } = req.body;

    if (!name ||!email || !code || !password || !confirmPassword || !phone || !documentationLink) {
        res.status(400);
        throw new Error("All fields are required");
      }

      if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
      }

      const pending = await PendingOrganization.findOne({ email });

      if (!pending || pending.code !== Number(code) || pending.expiresAt < Date.now()) {
        res.status(400);
        throw new Error("Invalid or expired verification code");
      }

      // Nahit l hash method zawja 
      //const hashedPassword = await bcrypt.hash(password, 10);

      const newOrganization = new Organization({
        name: pending.name,
        email  ,
        password,//bedelt fiha 
        phone,
        documentationLink,
        status: "approved", // will be reviewed by admin
      });

      await newOrganization.save();
      await PendingOrganization.deleteOne({ email });

      res.status(201).json({ message: "Organization registered successfully. Awaiting admin approval." });
    });

    //@desc Login user & return token
    //@route POST /api/orgAuth/login
    //@access Public
    const login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if(!email || !password){
          res.status(400);
          throw new Error("email and password are required")
      }
        const org = await Organization.findOne({ email });
        if ( !org) {
          res.status(400);
          throw new Error("org not found");
        }
      if ( !(await bcrypt.compare(password, org.password))) {
        res.status(400);
        throw new Error("Invalid credentials");
      }

        /*if (!org || !(await bcrypt.compare(password, org.password))) {
            res.status(400);
            throw new Error("Invalid credentials");
          }*/
        
          if (org.status !== "approved") {
            res.status(403);
            throw new Error("Your organization is not yet approved by the admin");
          }

          const token = jwt.sign({ id: org._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

          res.status(200).json({
            token,
            Organization: {
              id: org._id,
              name: org.name,
              email: org.email,
              phone: org.phone,
              status: org.status,
            },
          });
        });

  // @desc Logout organization (handled client-side)
  // @route POST /api/organization-auth/logout
  // @access Private
   const logout = (req, res) => {
       res.status(200).json({ message: "Organization logged out successfully" });
   };
        module.exports = {
            sendVerificationCode,
            completeSignup,
            login,
            logout,
          };