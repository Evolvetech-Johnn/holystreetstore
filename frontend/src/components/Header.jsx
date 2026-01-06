import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../hooks/useCart';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const Header = ({ 
  setCurrentPage, 
  onToggleCart, 
  onToggleFavorites, 
  onToggleSearch 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-holy sticky top-0 z-50">
      <div className={`${styles.container} py-4`}>
        <div className={`${styles.flexBetween} items-center`}>
          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold ${componentStyles.gradientText}`}>
              Holy Street
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className="text-gray-300 hover:text-primary-pink transition-colors font-medium"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-gray-300 hover:text-primary-pink transition-colors font-medium"
            >
              Catálogo
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-gray-300 hover:text-primary-pink transition-colors font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-gray-300 hover:text-primary-pink transition-colors font-medium"
            >
              Contato
            </button>
          </nav>

          {/* Actions */}
          <div className={`${styles.flexRow} items-center ${styles.spacingX}`}>
            {/* Search */}
            <button 
              onClick={onToggleSearch}
              className="p-2 text-gray-300 hover:text-primary-pink transition-colors"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Favorites */}
            <button 
              onClick={onToggleFavorites}
              className="p-2 text-gray-300 hover:text-primary-pink transition-colors"
            >
              <HeartIcon className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button 
              onClick={onToggleCart}
              className="p-2 text-gray-300 hover:text-primary-pink transition-colors relative"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-primary-pink transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-600 pt-4">
            <div className={`${styles.flexCol} ${styles.spacingY}`}>
              <button
                onClick={() => handleNavClick('home')}
                className="text-gray-300 hover:text-primary-pink transition-colors font-medium text-left"
              >
                Início
              </button>
              <button
                onClick={() => handleNavClick('catalog')}
                className="text-gray-300 hover:text-primary-pink transition-colors font-medium text-left"
              >
                Catálogo
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-gray-300 hover:text-primary-pink transition-colors font-medium text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-300 hover:text-primary-pink transition-colors font-medium text-left"
              >
                Contato
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;