import React, { memo, useMemo, useCallback, useState } from 'react';
import { 
  HeartIcon, 
  ShoppingBagIcon,
  StarIcon,
  PlusCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../hooks/useCart';
import componentStyles from '../styles/components.module.css';

const ProductCard = memo(({ product, onToggleFavorite, onQuickView, isFavorite }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { items: cartItems, addItem, openCart } = useCart();

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(product.id);
  }, [product.id, onToggleFavorite]);

  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);
    try {
      await addItem(product);
      openCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  }, [product, isAdding, addItem, openCart]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const pixPrice = useMemo(() => product.price * 0.9, [product.price]);

  return (
    <div className="group relative bg-[#111] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary-pink/50 hover:-translate-y-2">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.originalPrice > product.price && (
          <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
        {product.featured && (
          <span className="bg-primary-green text-black text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">
            Premium
          </span>
        )}
        {product.holyDropIncluded && (
          <span className="bg-primary-pink text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-holy">
            + Holy Drop
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex gap-2">
            <button 
                onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                className="flex-1 bg-white text-dark-primary py-3 rounded-lg font-black text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-primary-green transition-colors"
            >
                <EyeIcon className="h-4 w-4" /> Ver Detalhes
            </button>
            <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-12 bg-primary-pink text-white py-3 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
            >
                <ShoppingBagIcon className="h-5 w-5" />
            </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-red-500 transition-all"
        >
          {isFavorite ? <HeartSolidIcon className="h-5 w-5 text-red-500" /> : <HeartIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{product.reviews} avaliações</span>
        </div>

        <h3 className="text-white font-black uppercase italic tracking-wider text-sm mb-3 group-hover:text-primary-pink transition-colors">
          {product.name}
        </h3>

        <div className="flex flex-col gap-1">
            {product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through font-bold">
                    {formatPrice(product.originalPrice)}
                </span>
            )}
            <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-white italic">
                    {formatPrice(product.price)}
                </span>
            </div>
            <div className="mt-1 flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                <span className="text-[10px] font-black text-primary-green uppercase">Pix</span>
                <span className="text-sm font-black text-primary-green">{formatPrice(pixPrice)}</span>
                <span className="text-[10px] text-gray-400 font-bold">(-10%)</span>
            </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;