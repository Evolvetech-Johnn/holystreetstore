import React from 'react';
import { 
  HomeIcon, 
  RectangleStackIcon, 
  InformationCircleIcon, 
  ChatBubbleLeftRightIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const Navigation = ({ mobile = false, onItemClick }) => {
  const navigationItems = [
    {
      name: 'Início',
      href: '/',
      icon: HomeIcon,
      description: 'Página inicial'
    },
    {
      name: 'Catálogo',
      href: '/catalogo',
      icon: RectangleStackIcon,
      description: 'Nossos produtos'
    },
    {
      name: 'Sobre',
      href: '/sobre',
      icon: InformationCircleIcon,
      description: 'Nossa história'
    },
    {
      name: 'Contato',
      href: '/contato',
      icon: ChatBubbleLeftRightIcon,
      description: 'Fale conosco'
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: ChartBarIcon,
      description: 'Painel administrativo'
    }
  ];

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
    // Aqui será implementada a navegação com React Router
  };

  if (mobile) {
    return (
      <nav className="space-y-2" role="navigation" aria-label="Menu principal mobile">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:text-primary-pink hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              aria-label={item.description}
            >
              <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-primary-pink transition-colors duration-200" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-center space-x-8" role="navigation" aria-label="Menu principal">
      {navigationItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleItemClick(item)}
          className="relative px-3 py-2 text-gray-700 hover:text-primary-pink font-medium transition-all duration-300 group"
          aria-label={item.description}
        >
          <span className="relative z-10">{item.name}</span>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-pink/10 to-primary-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Active/hover underline */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-pink to-primary-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;