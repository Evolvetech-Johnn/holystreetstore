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
    sortBy: 'name'
  });

  // Dados de produtos realistas com imagens reais e sistema de estoque
  useEffect(() => {
    // Mock products data - in a real app, this would come from an API
    const mockProducts = [
      {
        id: 1,
        name: "Camiseta Holy Street Classic",
        price: 89.90,
        originalPrice: 129.90,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "camisetas",
        description: "Camiseta básica com estampa exclusiva Holy Street",
        isNew: false,
        isFeatured: true,
        discount: 31,
        rating: 4.8,
        stock: 15,
        tags: ["básica", "algodão", "unissex"]
      },
      {
        id: 2,
        name: "Moletom Urban Vibes",
        price: 159.90,
        originalPrice: 199.90,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "moletons",
        description: "Moletom com capuz e bolso canguru",
        isNew: true,
        isFeatured: false,
        discount: 20,
        rating: 4.6,
        stock: 8,
        tags: ["capuz", "algodão", "inverno"]
      },
      {
        id: 3,
        name: "Boné Street Faith",
        price: 49.90,
        originalPrice: 69.90,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "acessorios",
        description: "Boné snapback com bordado exclusivo",
        isNew: false,
        isFeatured: true,
        discount: 29,
        rating: 4.7,
        stock: 12,
        tags: ["snapback", "bordado", "ajustável"]
      },
      {
        id: 4,
        name: "Camiseta Fé",
        price: 79.90,
        originalPrice: 99.90,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "camisetas",
        description: "Camiseta com estampa inspiracional",
        isNew: false,
        isFeatured: false,
        discount: 20,
        rating: 4.5,
        stock: 20,
        tags: ["inspiracional", "algodão", "conforto"]
      },
      {
        id: 5,
        name: "Moletom Peace",
        price: 149.90,
        originalPrice: 189.90,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "moletons",
        description: "Moletom oversized com estampa peace",
        isNew: true,
        isFeatured: true,
        discount: 21,
        rating: 4.9,
        stock: 5,
        tags: ["oversized", "peace", "limitado"]
      }
    ];

    const mockCategories = [
      { name: "Camisetas", count: 5, icon: "👕" },
      { name: "Moletons", count: 3, icon: "🧥" },
      { name: "Bonés", count: 2, icon: "🧢" },
      { name: "Calças", count: 1, icon: "👖" },
      { name: "Acessórios", count: 1, icon: "💎" }
    ];

    // Simular carregamento de dados
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setCategories(mockCategories);
        setError(null);
      } catch {
        setError('Erro ao carregar produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrar produtos baseado nos filtros ativos
  const filteredProducts = products.filter(product => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    // Validar se os preços são números válidos
    const minPrice = Math.max(0, filters.minPrice || 0);
    const maxPrice = Math.max(minPrice, filters.maxPrice || 1000);
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // Filtros de estoque
    const matchesStock = !filters.stockStatus || 
      (filters.stockStatus === 'available' && product.stock.status === 'available') ||
      (filters.stockStatus === 'low_stock' && product.stock.status === 'low_stock') ||
      (filters.stockStatus === 'out_of_stock' && (product.stock.status === 'out_of_stock' || product.stock.status === 'sold_out'));
    
    return matchesCategory && matchesSearch && matchesPrice && matchesStock;
  });

  // Ordenar produtos baseado no filtro de ordenação
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
        return b.featured - a.featured;
      case 'newest':
        return b.id - a.id; // Assumindo que IDs maiores são mais novos
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'discount': {
        const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
        const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
        return discountB - discountA;
      }
      case 'stock':
        return (b.stock?.quantity || 0) - (a.stock?.quantity || 0);
      default:
        return 0;
    }
  });

  // Obter produtos em destaque
  const featuredProducts = products.filter(product => product.featured);

  // Obter produto por ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  // Obter produtos relacionados
  const getRelatedProducts = (productId, category, limit = 4) => {
    return products
      .filter(product => product.id !== productId && product.category === category)
      .slice(0, limit);
  };

  // Atualizar filtros
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Limpar filtros
  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'name'
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
    getRelatedProducts,
    updateFilters,
    clearFilters
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};