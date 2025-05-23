const asyncHandler = require('express-async-handler');

const adminMiddleware = asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role=== 'admin'){
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
});

module.exports = adminMiddleware;