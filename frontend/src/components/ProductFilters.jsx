import React, { useState } from 'react';
import { 
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProductFilters = ({ 
  categories = [], 
  filters, 
  onFiltersChange, 
  onClearFilters,
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizes = ["P", "M", "G", "GG", "XG"];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Off White', hex: '#F5F5F5' },
    { name: 'Graphite', hex: '#333333' },
    { name: 'Navy', hex: '#000080' }
  ];

  const handlePriceRange = (range) => {
    onFiltersChange({ minPrice: range.min, maxPrice: range.max });
  };

  const priceRanges = [
    { label: 'Até R$ 100', min: 0, max: 100 },
    { label: 'R$ 100 - R$ 200', min: 100, max: 200 },
    { label: 'Acima de R$ 200', min: 200, max: 1000 }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center justify-center gap-2 w-full bg-dark-secondary border border-gray-800 py-4 font-black uppercase tracking-widest text-white text-xs"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5 text-primary-pink" /> Filtrar e Ordenar
      </button>

      {/* Desktop & Mobile Content */}
      <div className={`${isOpen ? 'fixed inset-0 z-[100] bg-dark-primary flex flex-col p-6 overflow-y-auto' : 'hidden lg:block'} lg:bg-transparent lg:p-0 ${className}`}>
        
        <div className="flex items-center justify-between mb-8 lg:hidden">
            <h2 className="text-xl font-black uppercase italic italic text-white">Filtros</h2>
            <button onClick={() => setIsOpen(false)}><XMarkIcon className="h-8 w-8 text-white" /></button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="hidden lg:block text-sm font-black uppercase tracking-[0.2em] text-gray-500">Filtrar por</h2>
          <button 
            onClick={onClearFilters}
            className="text-[10px] font-black uppercase text-primary-pink hover:text-white transition-colors"
          >
            Limpar tudo
          </button>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4 flex items-center justify-between">
            Categorias <ChevronDownIcon className="h-4 w-4 text-primary-pink" />
          </h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.name} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.name}
                  onChange={() => onFiltersChange({ category: cat.name })}
                  className="w-4 h-4 rounded-full border-gray-700 bg-dark-secondary text-primary-pink focus:ring-primary-pink"
                />
                <span className={`text-sm font-bold transition-all ${filters.category === cat.name ? 'text-primary-pink' : 'text-gray-400 group-hover:text-white'}`}>
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Selection (Netshoes style) */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4">Tamanho</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`py-3 text-[10px] font-black border transition-all ${
                  filters.size === size 
                    ? 'bg-primary-pink border-primary-pink text-white shadow-holy' 
                    : 'bg-dark-secondary border-gray-800 text-gray-400 hover:border-gray-500'
                }`}
                onClick={() => onFiltersChange({ size })}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4">Cores</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.color === color.name ? 'border-primary-pink scale-125' : 'border-gray-800'
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => onFiltersChange({ color: color.name })}
              />
            ))}
          </div>
        </div>

        {/* Price Ranges */}
        <div className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4">Preço</h3>
          <div className="space-y-3">
            {priceRanges.map((range) => (
               <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                    onChange={() => handlePriceRange(range)}
                    className="w-4 h-4 border-gray-700 bg-dark-secondary text-primary-pink focus:ring-primary-pink"
                  />
                  <span className={`text-[11px] font-bold uppercase transition-all ${filters.minPrice === range.min ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {range.label}
                  </span>
               </label>
            ))}
          </div>
        </div>

        <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden mt-auto bg-primary-pink text-white py-5 font-black uppercase tracking-[0.2em] rounded-xl shadow-holy"
        >
            Ver Resultados
        </button>
      </div>
    </>
  );
};

export default ProductFilters;