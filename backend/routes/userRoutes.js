const express = require("express");
const { getUserProfile, updateUser, changePassword, deleteUser, getCurrentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const roleMiddleware = require("../middleware/roleMiddleware");
const { uploadProfilePicture } = require("../controllers/userController");
const upload = require('../middleware/multer'); // ton fichier multer.js
const router = express.Router();

router.get("/profile", validateToken, getUserProfile);

router.put("/update", validateToken, updateUser);
router.get("/me", validateToken, getCurrentUser); 

router.put("/change-password", validateToken, changePassword);

router.delete("/delete-user", validateToken, deleteUser);
router.post("/upload-profile-picture", validateToken, upload.single('file'),  uploadProfilePicture);

module.exports = router;