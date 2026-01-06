import React, { useState, useEffect, createContext } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'newest',
    stockStatus: ''
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        const result = await response.json();
        
        if (result.success) {
          setProducts(result.data);
          setCategories(result.filters.categories);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products client-side
  const filteredProducts = products.filter(product => {
    const matchesCategory = !filters.category || product.category.toLowerCase() === filters.category.toLowerCase();
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice || 1000;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    const matchesStock = !filters.stockStatus || 
      (filters.stockStatus === 'available' && product.stock.status === 'available') ||
      (filters.stockStatus === 'low_stock' && product.stock.status === 'low_stock');
    
    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  const featuredProducts = products.filter(product => product.featured);

  const getProductById = (id) => products.find(p => p.id === parseInt(id));

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'newest',
      stockStatus: ''
    });
  };

  const value = {
    products: sortedProducts,
    allProducts: products,
    categories,
    featuredProducts,
    loading,
    error,
    filters,
    getProductById,
    updateFilters,
    clearFilters,
    toggleFavorite: (id) => {
        // Basic toggle favorite implementation
        const savedFavorites = JSON.parse(localStorage.getItem('holy-street-favorites') || '[]');
        const newFavorites = savedFavorites.includes(id)
            ? savedFavorites.filter(fId => fId !== id)
            : [...savedFavorites, id];
        localStorage.setItem('holy-street-favorites', JSON.stringify(newFavorites));
    }
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};