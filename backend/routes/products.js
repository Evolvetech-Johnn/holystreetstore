const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Product data (migrated from original file)
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Camiseta Oversized Streetwear",
    description: "Camiseta oversized com estampa exclusiva, perfeita para o estilo urbano moderno.",
    price: 89.90,
    image: "/images/products/camiseta-oversized-1.jpg",
    images: [
      "/images/products/camiseta-oversized-1.jpg",
      "/images/products/camiseta-oversized-2.jpg",
      "/images/products/camiseta-oversized-3.jpg"
    ],
    category: "camisetas",
    collection: "streetwear",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Cinza"],
    rating: 4.8,
    reviews: 127,
    isNew: true,
    isOnSale: false,
    stock: 45
  },
  {
    id: 2,
    name: "Moletom Holy Street Premium",
    description: "Moletom premium com capuz, logo bordado e acabamento de alta qualidade.",
    price: 159.90,
    image: "/images/products/moletom-premium-1.jpg",
    images: [
      "/images/products/moletom-premium-1.jpg",
      "/images/products/moletom-premium-2.jpg",
      "/images/products/moletom-premium-3.jpg"
    ],
    category: "moletons",
    collection: "premium",
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Preto", "Rosa", "Verde"],
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isOnSale: true,
    originalPrice: 199.90,
    stock: 23
  },
  {
    id: 3,
    name: "Calça Cargo Street",
    description: "Calça cargo com múltiplos bolsos, ideal para o estilo urbano contemporâneo.",
    price: 199.90,
    image: "/images/products/calca-cargo-1.jpg",
    images: [
      "/images/products/calca-cargo-1.jpg",
      "/images/products/calca-cargo-2.jpg",
      "/images/products/calca-cargo-3.jpg"
    ],
    category: "calcas",
    collection: "urban",
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Preto", "Verde Militar", "Bege"],
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isOnSale: false,
    stock: 31
  },
  {
    id: 4,
    name: "Tênis Holy Street Limited",
    description: "Tênis edição limitada com design exclusivo e tecnologia de conforto avançada.",
    price: 299.90,
    image: "/images/products/tenis-limited-1.jpg",
    images: [
      "/images/products/tenis-limited-1.jpg",
      "/images/products/tenis-limited-2.jpg",
      "/images/products/tenis-limited-3.jpg"
    ],
    category: "calcados",
    collection: "limited",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    colors: ["Preto/Rosa", "Branco/Verde", "Cinza/Amarelo"],
    rating: 4.9,
    reviews: 203,
    isNew: true,
    isOnSale: false,
    stock: 12
  }
];

// GET /api/products - List all products
router.get('/', (req, res) => {
  try {
    const { category, collection, minPrice, maxPrice, search, sortBy, limit } = req.query;
    
    let filteredProducts = [...PRODUCTS_DATA];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by collection
    if (collection) {
      filteredProducts = filteredProducts.filter(product => 
        product.collection.toLowerCase() === collection.toLowerCase()
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
          filteredProducts.sort((a, b) => b.isNew - a.isNew);
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
        categories: [...new Set(PRODUCTS_DATA.map(p => p.category))],
        collections: [...new Set(PRODUCTS_DATA.map(p => p.collection))],
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

// GET /api/products/featured - Featured products
router.get('/featured/list', (req, res) => {
  try {
    const featuredProducts = PRODUCTS_DATA
      .filter(product => product.isNew || product.isOnSale || product.rating >= 4.8)
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
    const categories = [...new Set(PRODUCTS_DATA.map(p => p.category))];
    const categoriesWithCount = categories.map(category => ({
      name: category,
      count: PRODUCTS_DATA.filter(p => p.category === category).length
    }));

    res.json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

module.exports = router;