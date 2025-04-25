//# Protects private routes using JWT: json web token
//cette middleware garantit que seules les requêtes avec un token JWT valide accèdent aux routes protégées.
const jwt = require("jsonwebtoken");
const asyncHandler =require("express-async-handler");

const validateToken = asyncHandler(async (req,res,next)=>{
   const authHeader = req.headers["authorization"];

    if(!authHeader || !authHeader.startsWith("Bearer ")){
         return res.status(401).json({message:"User is not authorized or token is missing"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            id: decoded.id,
            fullName: decoded.fullName || null,
            
            email : decoded.email || null,
        };
        next();
    }catch(err){
       return res.status(401).json({message:"Invalid or expired token"});
    }
    
});
 
module.exports = validateToken;
