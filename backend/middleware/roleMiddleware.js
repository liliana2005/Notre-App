//This middleware restricts access to certain routes based on user roles.

const { recompileSchema } = require("../models/User")

const roleMiddleware = (role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){//check if the user's role is in the allowed list
            return res.status(403).json({message:"Access denied"})
        }//403: Forbidden access denied
        next();//if role is allowed, continue processing the request
    };
};

module.exports = roleMiddleware;