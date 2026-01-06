import React, { useState, useCallback, useMemo } from 'react';
import { 
  FunnelIcon, 
  XMarkIcon, 
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const ProductFilters = ({ 
  categories = [], 
  filters, 
  onFiltersChange, 
  onClearFilters,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    stock: true,
    sort: true
  });

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    onFiltersChange({ [key]: value });
  }, [onFiltersChange]);

  const handlePriceRangeChange = useCallback((min, max) => {
    onFiltersChange({ 
      minPrice: min, 
      maxPrice: max 
    });
  }, [onFiltersChange]);

  // Verificar se há filtros ativos
  const hasActiveFilters = useMemo(() => {
    return filters.category || 
           filters.search || 
           filters.minPrice > 0 || 
           filters.maxPrice < 1000 || 
           filters.sortBy !== 'name';
  }, [filters]);

  const sortOptions = useMemo(() => [
    { value: 'name', label: 'Nome A-Z', icon: '🔤' },
    { value: 'price-asc', label: 'Menor Preço', icon: '💰' },
    { value: 'price-desc', label: 'Maior Preço', icon: '💎' },
    { value: 'featured', label: 'Destaques', icon: '⭐' },
    { value: 'newest', label: 'Mais Novos', icon: '🆕' },
    { value: 'rating', label: 'Melhor Avaliados', icon: '⭐' },
    { value: 'discount', label: 'Maior Desconto', icon: '🏷️' },
    { value: 'stock', label: 'Maior Estoque', icon: '📦' }
  ], []);

  const priceRanges = useMemo(() => [
    { min: 0, max: 80, label: 'Até R$ 80', count: 8 },
    { min: 80, max: 120, label: 'R$ 80 - R$ 120', count: 3 },
    { min: 120, max: 180, label: 'R$ 120 - R$ 180', count: 4 },
    { min: 180, max: 300, label: 'Acima de R$ 180', count: 1 }
  ], []);

  const stockOptions = useMemo(() => [
    { value: '', label: 'Todos os produtos', icon: '📦', count: 12 },
    { value: 'available', label: 'Disponível', icon: '✅', count: 8 },
    { value: 'low_stock', label: 'Estoque baixo', icon: '⚠️', count: 2 },
    { value: 'out_of_stock', label: 'Esgotado/Vendido', icon: '❌', count: 2 }
  ], []);

  return (
    <>
      {/* Botão mobile para abrir filtros */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-700 transition-colors duration-200"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">
              Ativos
            </span>
          )}
        </button>
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-100">Filtros</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-100" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <FilterContent 
                categories={categories}
                filters={filters}
                sortOptions={sortOptions}
                priceRanges={priceRanges}
                stockOptions={stockOptions}
                expandedSections={expandedSections}
                hasActiveFilters={hasActiveFilters}
                onFilterChange={handleFilterChange}
                onPriceRangeChange={handlePriceRangeChange}
                onClearFilters={onClearFilters}
                onToggleSection={toggleSection}
              />
            </div>
          </div>
        </div>
      )}

      {/* Filtros desktop */}
      <div className={`hidden lg:block bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-700 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5" />
            <span>Filtros</span>
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-pink-400 hover:text-pink-300 font-medium transition-colors duration-200"
            >
              Limpar Filtros
            </button>
          )}
        </div>
        
        <FilterContent 
          categories={categories}
          filters={filters}
          sortOptions={sortOptions}
          priceRanges={priceRanges}
          stockOptions={stockOptions}
          expandedSections={expandedSections}
          onFilterChange={handleFilterChange}
          onPriceRangeChange={handlePriceRangeChange}
          onToggleSection={toggleSection}
        />
      </div>
    </>
  );
};

const FilterContent = ({ 
  categories, 
  filters, 
  sortOptions, 
  priceRanges, 
  stockOptions,
  expandedSections, 
  onFilterChange, 
  onPriceRangeChange,
  onToggleSection 
}) => {
  return (
    <div className="space-y-6">
      {/* Ordenação */}
      <div>
        <button
          onClick={() => onToggleSection('sort')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-100 mb-3"
        >
          <span className="flex items-center space-x-2">
            <span>🔄</span>
            <span>Ordenar por</span>
          </span>
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform duration-200 text-gray-100 ${
              expandedSections.sort ? 'rotate-180' : ''
            }`} 
          />
        </button>
        {expandedSections.sort && (
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={(e) => onFilterChange('sortBy', e.target.value)}
                  className="text-pink-600 focus:ring-pink-500"
                />
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Categorias */}
      <div>
        <button
          onClick={() => onToggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-100 mb-3"
        >
          <span className="flex items-center space-x-2">
            <span>📂</span>
            <span>Categorias</span>
          </span>
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform duration-200 text-gray-100 ${
              expandedSections.category ? 'rotate-180' : ''
            }`} 
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ''}
                  onChange={(e) => onFilterChange('category', e.target.value)}
                  className="text-pink-600 focus:ring-pink-500"
                />
                <span className="text-lg">🛍️</span>
                <span className="text-sm text-gray-300">Todas as categorias</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">(12)</span>
            </label>
            {categories.map((category) => (
              <label key={category.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="category"
                    value={category.name}
                    checked={filters.category === category.name}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm text-gray-300">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Status do Estoque */}
      <div>
        <button
          onClick={() => onToggleSection('stock')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-100 mb-3"
        >
          <span className="flex items-center space-x-2">
            <span>📦</span>
            <span>Disponibilidade</span>
          </span>
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform duration-200 text-gray-100 ${
              expandedSections.stock ? 'rotate-180' : ''
            }`} 
          />
        </button>
        {expandedSections.stock && (
          <div className="space-y-2">
            {stockOptions.map((option) => (
              <label key={option.value} className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="stock"
                    value={option.value}
                    checked={filters.stockStatus === option.value}
                    onChange={(e) => onFilterChange('stockStatus', e.target.value)}
                    className="text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm text-gray-300">{option.label}</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">({option.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Faixa de Preço */}
      <div>
        <button
          onClick={() => onToggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-100 mb-3"
        >
          <span className="flex items-center space-x-2">
            <span>💰</span>
            <span>Faixa de Preço</span>
          </span>
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform duration-200 text-gray-100 ${
              expandedSections.price ? 'rotate-180' : ''
            }`} 
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            {/* Faixas predefinidas */}
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="priceRange"
                      value={`${range.min}-${range.max}`}
                      checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                      onChange={() => onPriceRangeChange(range.min, range.max)}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-sm text-gray-300">{range.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">({range.count})</span>
                </label>
              ))}
            </div>
            
            {/* Divisor */}
            <div className="border-t border-gray-700 pt-3">
              <label className="text-sm text-gray-300 mb-2 block">💎 Preço personalizado</label>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => onFilterChange('minPrice', Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => onFilterChange('maxPrice', Number(e.target.value) || 1000)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;