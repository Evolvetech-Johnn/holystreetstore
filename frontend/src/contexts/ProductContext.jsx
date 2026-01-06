import React, { useState, useEffect, createContext } from 'react';

export const ProductContext = createContext();

// Mock data as fallback to ensure the site is always functional
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Oversized 'Propósito' - Black",
    description: "Camiseta premium com corte oversized, estampada com a palavra 'Propósito' em caligrafia urbana.",
    price: 129.90,
    originalPrice: 159.90,
    category: "Camisetas",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    featured: true,
    rating: 4.9,
    reviews: 24,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Black"],
    stock: { status: "available", quantity: 15 },
    holyDropIncluded: true
  },
  {
    id: 2,
    name: "Moletom Hoodie 'Santo' - Off White",
    description: "Moletom pesado com capuz, bordado minimalista 'Holy' no peito. Conforto e fé.",
    price: 249.90,
    originalPrice: 289.90,
    category: "Moletons",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    featured: true,
    rating: 5.0,
    reviews: 12,
    sizes: ["M", "G", "GG"],
    colors: ["Off White"],
    stock: { status: "available", quantity: 8 },
    holyDropIncluded: true
  },
  {
    id: 3,
    name: "Camiseta Boxy 'Identidade' - Acid Wash",
    description: "Corte boxy moderno com lavagem estonada. Estampa frontal inspirada em Salmos.",
    price: 139.90,
    category: "Camisetas",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
    featured: false,
    rating: 4.8,
    reviews: 18,
    sizes: ["P", "M", "G"],
    colors: ["Cinza Estonado"],
    stock: { status: "low_stock", quantity: 3 },
    holyDropIncluded: true
  },
  {
    id: 4,
    name: "Calça Jogger 'Caminho' - Cargo",
    description: "Calça cargo em sarja premium. Detalhes utilitários e ajuste perfeito para o urbano.",
    price: 199.90,
    category: "Calças",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    featured: false,
    rating: 4.7,
    reviews: 9,
    sizes: ["38", "40", "42", "44"],
    colors: ["Preto", "Bege"],
    stock: { status: "available", quantity: 12 },
    holyDropIncluded: true
  }
];

const FALLBACK_CATEGORIES = [
  { name: "Camisetas", icon: "👕", count: 2 },
  { name: "Moletons", icon: "🧥", count: 1 },
  { name: "Calças", icon: "👖", count: 1 },
  { name: "Acessórios", icon: "🧢", count: 1 }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS); // Initialize with fallback
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'newest',
    stockStatus: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Attempt to reach the backend, but don't crash if it fails
        const response = await fetch('http://localhost:5000/api/products').catch(() => null);
        
        if (response && response.ok) {
          const result = await response.json();
          if (result.success) {
            setProducts(result.data);
            setCategories(result.filters.categories);
          }
        } else {
          console.warn('Backend reach failed. Using fallback data for UX stability.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !filters.category || product.category.toLowerCase() === filters.category.toLowerCase();
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const minPrice = filters.minPrice || 0;
    const maxPrice = filters.maxPrice || 2000;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    const matchesStock = !filters.stockStatus || 
      (filters.stockStatus === 'available' && product.stock?.status === 'available');
    
    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

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
      maxPrice: 2000,
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