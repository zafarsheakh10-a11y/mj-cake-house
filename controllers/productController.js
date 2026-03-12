const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Could not create product', error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Could not update product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete product', error: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating) || 5,
      comment
    });

    const avg = product.reviews.reduce((sum, rev) => sum + rev.rating, 0) / product.reviews.length;
    product.averageRating = Number.isNaN(avg) ? 0 : avg;

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Could not add review', error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview
};
