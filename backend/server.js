require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
const seedDefaultAdmin = require('./scripts/seedAdmin');

const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');
const uploadRoutes = require('../routes/uploadRoutes');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDefaultAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
