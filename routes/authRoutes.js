const express = require('express');
const { register, login, getMe, changePassword } = require('../controllers/authController');
const { auth } = require('../backend/middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', login);
router.get('/me', auth, getMe);
router.post('/change-password', auth, changePassword);

module.exports = router;
