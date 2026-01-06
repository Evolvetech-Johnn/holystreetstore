import React, { memo, useMemo, useCallback, useState } from 'react';
import { HeartIcon, CubeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../hooks/useCart';
import componentStyles from '../styles/components.module.css';
import styles from '../styles/layout.module.css';

const ProductCard = memo(({ product, onToggleFavorite, onQuickView, isFavorite }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { items: cartItems, addItem, openCart } = useCart();

  // All hooks must be called at the top level, before any early returns
  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    if (onToggleFavorite && product?.id) {
      onToggleFavorite(product.id);
    }
  }, [product?.id, onToggleFavorite]);

  const isProductInCart = useMemo(() => {
    return cartItems && cartItems.some(item => item.id === product?.id);
  }, [cartItems, product?.id]);

  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation();
    
    if (!product?.id || isAdding) return;
    
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

  const handleQuickView = useCallback((e) => {
    e.stopPropagation();
    if (onQuickView && product) {
      onQuickView(product);
    }
  }, [onQuickView, product]);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }, []);

  const hasDiscount = useMemo(() => {
    if (!product) return false;
    return product.originalPrice && product.originalPrice > product.price;
  }, [product]);

  // Early return if no product
  if (!product) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="text-gray-400 text-center">
          Produto não encontrado
        </div>
      </div>
    );
  }

  // Destructure with safe defaults
  const {
    name = 'Produto sem nome',
    description = '',
    price = 0, 
    originalPrice = 0, 
    featured = false,
    stock = { status: 'in_stock', quantity: 0 },
    rating = 0,
    reviews = 0
  } = product;

  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  // Stock status styling
  const getStockBadge = () => {
    switch (stock.status) {
      case 'available':
        return (
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <CubeIcon className="h-3 w-3" />
            <span>{stock.quantity} em estoque</span>
          </div>
        );
      case 'low_stock':
        return (
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            <ExclamationTriangleIcon className="h-3 w-3" />
            <span>Últimas {stock.quantity} unidades</span>
          </div>
        );
      case 'out_of_stock':
      case 'sold_out':
        return (
          <div className="flex items-center gap-1 text-red-400 text-xs">
            <ExclamationTriangleIcon className="h-3 w-3" />
            <span>Esgotado</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getButtonState = () => {
    if (stock.status === 'out_of_stock' || stock.status === 'sold_out') {
      return {
        disabled: true,
        text: 'Esgotado',
        className: 'bg-gray-600 text-gray-400 cursor-not-allowed'
      };
    }
    
    if (isProductInCart) {
      return {
        disabled: false,
        text: 'No Carrinho',
        className: 'bg-green-500 text-white hover:bg-green-600'
      };
    }
    
    return {
      disabled: false,
      text: 'Adicionar ao Carrinho',
      className: componentStyles.btnPrimary
    };
  };

  const buttonState = getButtonState();

  return (
    <div className={`${componentStyles.card} group cursor-pointer transform transition-all duration-300 hover:scale-105 ${componentStyles.holyShadow} ${stock.status === 'out_of_stock' || stock.status === 'sold_out' ? 'opacity-75' : ''}`}>
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Discount Badge */}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          
          {/* Featured Badge */}
          {featured && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              Destaque
            </span>
          )}
          
          {/* Stock Status Badge */}
          {stock.status === 'out_of_stock' || stock.status === 'sold_out' ? (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Esgotado
            </span>
          ) : stock.status === 'low_stock' && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              Últimas unidades
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleQuickView}
            className={`${componentStyles.btnSecondary} text-white border-white hover:bg-white hover:text-gray-900`}
          >
            Visualização Rápida
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-100 mb-2 line-clamp-2">
          {name}
        </h3>
        
        {/* Rating */}
        {rating && rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {rating.toFixed(1)} ({reviews} avaliações)
            </span>
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        {/* Stock Info */}
        <div className="mb-3">
          {getStockBadge()}
        </div>
        
        {/* Price */}
        <div className="mb-4">
          {hasDiscount ? (
            <div className={styles.flexRow}>
              <span className="text-lg font-bold text-gray-100">
                {formatPrice(price)}
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(originalPrice)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-100">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={buttonState.disabled || isAdding}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            isAdding ? 'animate-pulse bg-green-500 text-white' : buttonState.className
          }`}
        >
          {isAdding ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adicionando...
            </div>
          ) : (
            buttonState.text
          )}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;