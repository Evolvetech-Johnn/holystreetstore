import React from 'react';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../hooks/useCart';
import componentStyles from '../styles/components.module.css';

const CartSidebar = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalItems,
    getSubtotal,
    getTotalDiscount,
    getFinalTotal
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Carrinho ({getTotalItems()})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13l-1.1 5m0 0h9.1M6 16a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-500">
                Adicione alguns produtos para começar suas compras.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize || 'default'}-${item.selectedColor || 'default'}`} className={`${componentStyles.card} p-4 transform transition-all duration-300 hover:shadow-lg animate-fadeIn`}>
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500 mt-1">
                          Tamanho: {item.selectedSize}
                        </p>
                      )}
                      {item.selectedColor && (
                        <p className="text-xs text-gray-500 mt-1">
                          Cor: {item.selectedColor}
                        </p>
                      )}
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        {formatPrice(item.price)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-100 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium min-w-[2rem] text-center transition-all duration-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-all duration-200 transform hover:scale-105"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded transition-all duration-200 ml-2 transform hover:scale-105"
                          title="Remover item"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Resumo de valores */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900 text-right">{formatPrice(getSubtotal())}</span>
              </div>
              {getTotalDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span className="text-right">-{formatPrice(getTotalDiscount())}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Frete:</span>
                <span className="text-green-600">Grátis</span>
              </div>
            </div>
            
            {/* Total final */}
            <div className="flex justify-between items-center text-lg font-bold border-t pt-2 text-gray-900">
              <span>Total:</span>
              <span>{formatPrice(getFinalTotal())}</span>
            </div>
            
            <button className={`${componentStyles.btnPrimary} w-full transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}>
              Finalizar Compra
            </button>
            <button 
              onClick={closeCart}
              className={`${componentStyles.btnOutline} w-full transform transition-all duration-200 hover:scale-105`}
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;