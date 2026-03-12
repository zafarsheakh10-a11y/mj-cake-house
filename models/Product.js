const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    description: { type: String, required: true },
    images: [{ type: String }],
    video: { type: String },
    category: { type: String, required: true, trim: true },
    tags: [{ type: String }],
    stockQuantity: { type: Number, required: true, min: 0 },
    availabilityStatus: { type: String, enum: ['in-stock', 'out-of-stock'], default: 'in-stock' },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
