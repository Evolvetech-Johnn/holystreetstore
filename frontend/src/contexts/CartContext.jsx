import React, { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('holy-street-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        // Erro silencioso - apenas limpa o localStorage corrompido
        localStorage.removeItem('holy-street-cart');
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que items mudar
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('holy-street-cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('holy-street-cart');
    }
  }, [items]);

  // Adicionar item ao carrinho
  const addItem = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );

      if (existingItemIndex > -1) {
        // Item já existe, aumentar quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Novo item
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedSize,
          selectedColor,
          quantity,
          addedAt: new Date().toISOString()
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Remover item do carrinho
  const removeItem = (itemId, selectedSize = null, selectedColor = null) => {
    setItems(prevItems => 
      prevItems.filter(
        item => !(
          item.id === itemId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        )
      )
    );
  };

  // Atualizar quantidade de um item
  const updateQuantity = (itemId, selectedSize, selectedColor, newQuantity) => {
    if (newQuantity <= 0) {
      // Se a quantidade for 0 ou menor, remover o item
      removeItem(itemId, selectedSize, selectedColor);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => {
        if (
          item.id === itemId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('holy-street-cart');
  };

  // Obter quantidade total de itens
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Obter valor total do carrinho
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obter subtotal (sem descontos)
  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.originalPrice || item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  // Obter total de desconto
  const getTotalDiscount = () => {
    return items.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        const discount = (item.originalPrice - item.price) * item.quantity;
        return total + discount;
      }
      return total;
    }, 0);
  };

  // Obter valor final (com descontos aplicados)
  const getFinalTotal = () => {
    return getTotalPrice(); // Por enquanto, igual ao total price
  };

  // Obter item específico
  const getItem = (itemId, selectedSize = null, selectedColor = null) => {
    return items.find(
      item => 
        item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );
  };

  // Verificar se item está no carrinho
  const isInCart = (itemId, selectedSize = null, selectedColor = null) => {
    return items.some(
      item => 
        item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );
  };

  // Abrir/fechar carrinho
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  // Aplicar cupom de desconto (funcionalidade futura)
  const applyCoupon = () => {
    // TODO: Implementar lógica de cupons
    // Funcionalidade em desenvolvimento
  };

  // Calcular frete (funcionalidade futura)
  const calculateShipping = () => {
    // TODO: Implementar cálculo de frete
    return 0; // Frete grátis por enquanto
  };

  const value = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    getTotalDiscount,
    getFinalTotal,
    getItem,
    isInCart,
    openCart,
    closeCart,
    toggleCart,
    applyCoupon,
    calculateShipping
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};