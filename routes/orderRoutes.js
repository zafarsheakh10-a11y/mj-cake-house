const express = require('express');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { auth, adminOnly } = require('../backend/middleware/auth');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my', auth, getMyOrders);
router.get('/', auth, adminOnly, getAllOrders);
router.patch('/:id/status', auth, adminOnly, updateOrderStatus);

module.exports = router;
