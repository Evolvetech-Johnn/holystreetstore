const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Holy Street Store API is running',
    timestamp: new Date().toISOString()
  });
});

// Mock products endpoint
app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Camiseta Streetwear Premium',
      price: 89.90,
      image: '/images/tshirt-1.jpg',
      category: 'Camisetas'
    },
    {
      id: 2,
      name: 'Moletom Urban Style',
      price: 159.90,
      image: '/images/hoodie-1.jpg',
      category: 'Moletons'
    },
    {
      id: 3,
      name: 'Boné Snapback Classic',
      price: 69.90,
      image: '/images/cap-1.jpg',
      category: 'Acessórios'
    }
  ];
  
  res.json(products);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});