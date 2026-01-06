import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../hooks/useCart';

const CartIcon = ({ className = '' }) => {
  const { getTotalItems, openCart } = useCart();
  const itemCount = getTotalItems();

  return (
    <button
      onClick={openCart}
      className={`relative p-2 text-gray-700 hover:text-purple-600 transition-colors ${className}`}
      aria-label={`Carrinho de compras (${itemCount} itens)`}
    >
      <ShoppingBagIcon className="h-6 w-6" />
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem] animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;