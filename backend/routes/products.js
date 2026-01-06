const express = require('express');
const router = express.Router();
const { PRODUCTS_DATA, CATEGORIES_DATA } = require('../data/productsData');

// GET /api/products - List all products
router.get('/', (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sortBy, limit } = req.query;
    
    let filteredProducts = [...PRODUCTS_DATA];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }

    // Search by name or description
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Sort by ID descending as a proxy for newest if no date provided
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
    }

    // Limit results
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }

    res.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      filters: {
        categories: CATEGORIES_DATA,
        priceRange: {
          min: Math.min(...PRODUCTS_DATA.map(p => p.price)),
          max: Math.max(...PRODUCTS_DATA.map(p => p.price))
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET /api/products/featured - Featured products
router.get('/featured/list', (req, res) => {
  try {
    const featuredProducts = PRODUCTS_DATA
      .filter(product => product.featured || product.rating >= 4.9)
      .slice(0, 8);

    res.json({
      success: true,
      data: featuredProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured products',
      error: error.message
    });
  }
});

// GET /api/products/categories - List categories
router.get('/categories/list', (req, res) => {
  try {
    res.json({
      success: true,
      data: CATEGORIES_DATA
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// GET /api/products/:id - Find product by ID
router.get('/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = PRODUCTS_DATA.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Related products (same category, excluding current)
    const relatedProducts = PRODUCTS_DATA
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    res.json({
      success: true,
      data: {
        ...product,
        relatedProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

module.exports = router;