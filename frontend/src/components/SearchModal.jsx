import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import componentStyles from '../styles/components.module.css';

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions] = useState([
    'Camisetas',
    'Moletons',
    'Fé',
    'Esperança',
    'Amor',
    'Paz',
    'Gratidão',
    'Força'
  ]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-primary-pink/30 rounded-lg p-6 w-full max-w-md max-h-[80vh] relative shadow-holy">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-display text-white bg-gradient-to-r from-primary-pink to-primary-green bg-clip-text text-transparent">
            Buscar Produtos
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-primary-pink transition-colors p-2 rounded-lg hover:bg-primary-pink/10"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Digite o que você procura..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${componentStyles.inputField} pl-10 pr-12`}
              autoFocus
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-pink transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Suggestions */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Sugestões Populares</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-full hover:bg-primary-pink hover:text-white transition-colors border border-gray-700 hover:border-primary-pink"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;