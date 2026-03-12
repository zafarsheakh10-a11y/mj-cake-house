const Order = require('../models/Order');
const Product = require('../models/Product');

const genOrderId = () => `MJCH-${Date.now()}`;

const createOrder = async (req, res) => {
  try {
    const { customerName, phoneNumber, items } = req.body;
    if (!customerName || !phoneNumber || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const mappedItems = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product) throw new Error('Product not found in catalog');
      const price = product.discountPrice || product.price;
      return {
        product: product._id,
        name: product.name,
        price,
        quantity: item.quantity
      };
    });

    const totalAmount = mappedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      orderId: genOrderId(),
      user: req.user._id,
      customerName,
      phoneNumber,
      productsOrdered: mappedItems,
      totalAmount
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Could not create order', error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch orders', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch all orders', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Could not update order status', error: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
