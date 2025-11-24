import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Premium quality product with excellent features and design.'
  }
}, {
  timestamps: true
});

// Create index for search optimization
productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;

