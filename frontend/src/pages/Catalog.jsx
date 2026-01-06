import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const Catalog = ({ searchTerm: initialSearchTerm = '' }) => {
  const { 
    products, 
    categories, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    clearFilters 
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || filters.search || '');
  const [favorites, setFavorites] = useState([]);

  // Atualizar searchTerm quando initialSearchTerm mudar
  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm]);

  // Sincronizar busca com filtros
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilters({ search: searchTerm });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, updateFilters]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('holy-street-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleAddToCart = () => {
    // TODO: Implementar lógica do carrinho
    // Funcionalidade em desenvolvimento
  };

  const handleToggleFavorite = (product) => {
    const newFavorites = favorites.includes(product.id)
      ? favorites.filter(id => id !== product.id)
      : [...favorites, product.id];
    
    setFavorites(newFavorites);
    localStorage.setItem('holy-street-favorites', JSON.stringify(newFavorites));
  };

  const handleQuickView = () => {
    // TODO: Implementar modal de visualização rápida
    // Funcionalidade em desenvolvimento
  };

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className={`${styles.minHeight} bg-gray-900 ${styles.flexCenter}`}>
        <div className={styles.textCenter}>
          <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Erro ao carregar produtos</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={componentStyles.btnPrimary}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.minHeight} bg-gray-900`}>
      {/* Header da página */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className={`${styles.container} py-8`}>
          <div className={`${styles.textCenter} mb-8`}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              Catálogo de Produtos
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra nossa coleção exclusiva de roupas streetwear com designs únicos 
              e qualidade premium. Encontre o seu estilo perfeito.
            </p>
          </div>

          {/* Barra de busca */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={componentStyles.inputField}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className={`${styles.container} py-8`}>
        <div className={`${styles.gridContainer} ${styles.gridCols4} gap-8`}>
          {/* Sidebar com filtros */}
          <div className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              filters={filters}
              hasActiveFilters={
                filters.category || 
                filters.search || 
                filters.minPrice > 0 || 
                filters.maxPrice < 1000 || 
                filters.sortBy !== 'name'
              }
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              className="sticky top-4"
            />
          </div>

          {/* Grid de produtos */}
          <div className="lg:col-span-3">
            {/* Informações dos resultados */}
            <div className={`${styles.flexBetween} mb-6`}>
              <div className="text-sm text-gray-400">
                {loading ? (
                  'Carregando produtos...'
                ) : (
                  `${products.length} produto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`
                )}
              </div>
              
              {/* Ordenação rápida mobile */}
              <div className="lg:hidden">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="border border-gray-600 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="name">Nome A-Z</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="featured">Destaques</option>
                  <option value="newest">Mais Novos</option>
                  <option value="discount">Maior Desconto</option>
                </select>
              </div>
            </div>

            {/* Grid de produtos */}
            <ProductGrid
              products={products}
              loading={loading}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onQuickView={handleQuickView}
              favorites={favorites}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;