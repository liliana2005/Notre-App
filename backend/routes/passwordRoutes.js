if (!org || !(await bcrypt.compare(password, org.password))) {
  res.status(400);
  throw new Error("Invalid credentials");
}

if (org.status !== "approved") {
  res.status(403);
  throw new Error("Your organization is not yet approved by the admin");
}

const token = jwt.sign({ id: org._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

res.status(200).json({
  token,
  organization: {
    id: org._id,
    name: org.name,
    email: org.email,
    phone: org.phone,
    status: org.status,
  },
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