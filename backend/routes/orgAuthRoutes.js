const express = require("express");
const {
  sendVerificationCode,
  completeSignup,
  login,
  logout
} = require("../controllers/orgAuthController");

const router = express.Router();

router.post("/send-verification-code", sendVerificationCode);
router.post("/complete-signup", completeSignup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;