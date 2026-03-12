const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) return cb(null, true);
  cb(new Error('Only image files are allowed'));
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/')) return cb(null, true);
  cb(new Error('Only video files are allowed'));
};

const imageUpload = multer({ storage, fileFilter: imageFilter });
const videoUpload = multer({ storage, fileFilter: videoFilter });

module.exports = { imageUpload, videoUpload };
