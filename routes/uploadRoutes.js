const express = require('express');
const { uploadImages, uploadVideo } = require('../controllers/uploadController');
const { auth, adminOnly } = require('../backend/middleware/auth');
const { imageUpload, videoUpload } = require('../backend/middleware/upload');

const router = express.Router();

router.post('/images', auth, adminOnly, imageUpload.array('images', 5), uploadImages);
router.post('/video', auth, adminOnly, videoUpload.single('video'), uploadVideo);

module.exports = router;
