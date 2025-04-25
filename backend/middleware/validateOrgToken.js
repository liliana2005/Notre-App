const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateOrgToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Organization is not authorized or token is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    req.organization = {
      id: decoded.id,
      name: decoded.name || null,
      email: decoded.email || null,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = validateOrgToken;
