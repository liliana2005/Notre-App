const express = require('express');
const upload = require('../middleware/multer');
const { handleUpload } = require('../controllers/uploadController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/', validateToken, upload.single('file'), handleUpload);

module.exports = router;