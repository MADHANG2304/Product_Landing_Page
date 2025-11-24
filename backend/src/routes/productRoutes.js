import express from 'express';
import { getAllProducts, getProductById, searchProducts } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/products', getAllProducts);

// GET /api/products/:id - Get single product by ID
router.get('/products/:id', getProductById);

// GET /api/search?q=term - Search products
router.get('/search', searchProducts);

export default router;

