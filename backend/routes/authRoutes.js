//Authentification routes: → Routes for signup/login
const express = require("express");//a framework to create servers
const {sendVerificationCode,completeSignup, login, logout} = require("../controllers/authController");
const passwordController = require('../controllers/passwordController');
const { forgotPassword, resetPassword } = require("../controllers/passwordController");
const validateToken = require("../middleware/validateToken");
const roleMiddleware = require("../middleware/roleMiddleware")

const router = express.Router();
    //creates a mini-router that helps organize routes in a seperate file

    router.post('/send-verification-code', sendVerificationCode);
    router.post('/complete-signup', completeSignup);
router.post("/login",login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

// 🛑 PROTECTED ROUTE - Only accessible with a valid token
 


 //Only organisation can create projects
 router.post("/projects",validateToken,roleMiddleware(["organization"]),(req,res)=>{
    res.status(201).json({message:"Project created successfully"});
 });

 router.post("/donate", validateToken , roleMiddleware(["donor"]),(req,res)=>{
    res.json({message:"Donation suuccessful"});
 });


module.exports = router;



// router.post("/signup", signup):signifie que lorsque un utilisateur envoie une requête POST à l'URL /api/auth/signup, la fonction signup sera exécutée.

