const express = require("express");
const { getUserProfile, updateUser, changePassword, deleteUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", validateToken, getUserProfile);

router.put("/profile", validateToken, updateUser);

router.put("/change-password", validateToken, changePassword);

router.delete("/delete-user", validateToken, deleteUser);
module.exports = router;