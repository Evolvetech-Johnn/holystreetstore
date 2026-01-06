import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { 
    MagnifyingGlassIcon, 
    ArrowsUpDownIcon,
    Bars4Icon,
    Squares2X2Icon
} from '@heroicons/react/24/outline';
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
    clearFilters,
    toggleFavorite,
    addToCart
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || filters.search || '');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilters({ search: searchTerm });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, updateFilters]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('holy-street-favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
    const updated = JSON.parse(localStorage.getItem('holy-street-favorites') || '[]');
    setFavorites(updated);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-dark-secondary p-10 rounded-3xl border border-gray-800 shadow-holy">
          <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic mb-4">Erro de Conexão</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`${componentStyles.btnPrimary} w-full`}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Page Header (Netshoes Style) */}
      <div className="bg-dark-secondary border-b border-gray-800 py-10 md:py-16">
        <div className={`${styles.container}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
                <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                    <span className="hover:text-primary-pink cursor-pointer">Início</span>
                    <span>/</span>
                    <span className="text-white">Shop All</span>
                </nav>
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
                  Coleção <span className={componentStyles.gradientText}>Completa</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  Peças autênticas para quem carrega Cristo no estilo de vida. Qualidade premium, corte streetwear e propósito em cada detalhe.
                </p>
            </div>

            <div className="flex items-center gap-4 bg-dark-tertiary p-2 rounded-xl border border-gray-800">
               <div className="relative flex-1 md:w-64">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Buscar nesta coleção..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none text-white text-sm focus:ring-0 pl-10 h-10"
                    />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.container} py-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              className="sticky top-28"
            />
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-800">
                <div className="text-xs font-black uppercase tracking-widest text-gray-500">
                    Exibindo <span className="text-white">{products.length}</span> resultados
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <ArrowsUpDownIcon className="h-4 w-4 text-primary-pink" />
                        <select
                            value={filters.sortBy}
                            onChange={(e) => updateFilters({ sortBy: e.target.value })}
                            className="bg-transparent border-none text-white text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer p-0 pr-8"
                        >
                            <option value="newest">Lançamentos</option>
                            <option value="price-asc">Menor Preço</option>
                            <option value="price-desc">Maior Preço</option>
                            <option value="rating">Melhor Avaliados</option>
                        </select>
                    </div>
                    
                    <div className="hidden sm:flex items-center gap-2 border-l border-gray-800 pl-6">
                         <button className="p-1.5 text-primary-pink"><Squares2X2Icon className="h-5 w-5" /></button>
                         <button className="p-1.5 text-gray-600 hover:text-gray-400"><Bars4Icon className="h-5 w-5" /></button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              onAddToCart={addToCart}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />

            {!loading && products.length === 0 && (
                <div className="py-20 text-center">
                    <div className="text-6xl mb-6 opacity-30">🔍</div>
                    <h3 className="text-xl font-black text-white uppercase italic mb-2">Nenhum drop encontrado</h3>
                    <p className="text-gray-500 mb-8">Tente ajustar seus filtros ou buscar por outro termo.</p>
                    <button 
                        onClick={clearFilters}
                        className="text-primary-pink text-xs font-black uppercase tracking-widest border border-primary-pink px-6 py-3 rounded-lg hover:bg-primary-pink hover:text-white transition-all"
                    >
                        Limpar Filtros
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;