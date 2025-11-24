import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import connectDB from './db.js';

dotenv.config();

const sampleProducts = [
  // Electronics
  {
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    price: 999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    description: 'The latest iPhone with advanced A17 Pro chip, stunning camera system, and all-day battery life.'
  },
  {
    name: 'Samsung Galaxy S24',
    category: 'Electronics',
    price: 899,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
    description: 'Flagship Android smartphone with cutting-edge features and premium design.'
  },
  {
    name: 'MacBook Pro 16"',
    category: 'Electronics',
    price: 2499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
    description: 'Powerful laptop for professionals with M3 chip, stunning Retina display, and exceptional performance.'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Electronics',
    price: 399,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'Industry-leading noise cancellation with premium sound quality and 30-hour battery life.'
  },
  {
    name: 'Canon EOS R5 Camera',
    category: 'Electronics',
    price: 3899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
    description: 'Professional mirrorless camera with 45MP sensor and 8K video recording capabilities.'
  },
  {
    name: 'Apple Watch Series 9',
    category: 'Electronics',
    price: 399,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500',
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and cellular connectivity.'
  },
  {
    name: 'Dell XPS 15 Laptop',
    category: 'Electronics',
    price: 1799,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    description: 'Premium ultrabook with 4K display, powerful processors, and sleek design.'
  },
  {
    name: 'iPad Pro 12.9"',
    category: 'Electronics',
    price: 1099,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    description: 'Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.'
  },
  {
    name: 'Bose QuietComfort 45',
    category: 'Electronics',
    price: 329,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    description: 'Premium wireless headphones with world-class noise cancellation and crystal-clear audio.'
  },
  {
    name: 'Samsung 55" QLED TV',
    category: 'Electronics',
    price: 1299,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1664908791396-06604db3b36c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhbXN1bmclMjB0dnxlbnwwfHwwfHx8MA%3D%3D',
    description: '4K QLED smart TV with Quantum HDR, voice control, and stunning picture quality.'
  },
  {
    name: 'GoPro Hero 12',
    category: 'Electronics',
    price: 399,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
    description: 'Action camera with 5K video, HyperSmooth stabilization, and waterproof design.'
  },
  {
    name: 'Microsoft Surface Pro 9',
    category: 'Electronics',
    price: 999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    description: 'Versatile 2-in-1 device with detachable keyboard, touchscreen, and powerful performance.'
  },
  // Shoes
  {
    name: 'Nike Air Max 270',
    category: 'Shoes',
    price: 150,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Comfortable running shoes with Air Max cushioning and breathable mesh upper.'
  },
  {
    name: 'Adidas Ultraboost 22',
    category: 'Shoes',
    price: 180,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
    description: 'Premium running shoes with Boost midsole technology for maximum energy return.'
  },
  {
    name: 'Puma RS-X Sneakers',
    category: 'Shoes',
    price: 110,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500',
    description: 'Retro-inspired sneakers with bold design and comfortable fit for everyday wear.'
  },
  {
    name: 'Nike Air Force 1',
    category: 'Shoes',
    price: 90,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Classic basketball-inspired sneakers with timeless design and durable construction.'
  },
  // Shirts
  {
    name: 'Classic Oxford Shirt',
    category: 'Shirts',
    price: 45,
    rating: 4.4,
    image: 'https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpcnR8ZW58MHx8MHx8fDA%3D',
    description: 'Premium cotton oxford shirt with button-down collar, perfect for business or casual wear.'
  },
  {
    name: 'Formal Dress Shirt',
    category: 'Shirts',
    price: 55,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNoaXJ0fGVufDB8fDB8fHww',
    description: 'Professional dress shirt with wrinkle-free fabric and slim fit design.'
  },
  {
    name: 'Casual Flannel Shirt',
    category: 'Shirts',
    price: 40,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNoaXJ0fGVufDB8fDB8fHww',
    description: 'Comfortable flannel shirt with soft brushed fabric, ideal for relaxed occasions.'
  },
  // T-Shirts
  {
    name: 'Nike Dri-FIT T-Shirt',
    category: 'T-Shirts',
    price: 35,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Moisture-wicking athletic t-shirt with breathable fabric for workouts and sports.'
  },
  {
    name: 'Classic Cotton T-Shirt',
    category: 'T-Shirts',
    price: 25,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hpcnR8ZW58MHx8MHx8fDA%3D',
    description: 'Soft cotton t-shirt with comfortable fit, perfect for everyday casual wear.'
  },
  {
    name: 'Premium V-Neck T-Shirt',
    category: 'T-Shirts',
    price: 30,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1759572095329-1dcf9522762b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Stylish v-neck t-shirt made from premium cotton blend with modern fit.'
  },
  // Bags
  {
    name: 'Leather Backpack',
    category: 'Bags',
    price: 120,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    description: 'Premium leather backpack with multiple compartments and laptop sleeve.'
  },
  {
    name: 'Travel Duffel Bag',
    category: 'Bags',
    price: 80,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww',
    description: 'Spacious duffel bag with durable construction, perfect for gym or travel.'
  },
  {
    name: 'Designer Handbag',
    category: 'Bags',
    price: 250,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFnfGVufDB8fDB8fHww',
    description: 'Elegant designer handbag with premium materials and sophisticated design.'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

