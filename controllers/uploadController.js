const uploadImages = (req, res) => {
  const files = req.files || [];
  const urls = files.map((file) => `/uploads/${file.filename}`);
  res.status(201).json({ urls });
};

const uploadVideo = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Video file required' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
};

module.exports = { uploadImages, uploadVideo };
