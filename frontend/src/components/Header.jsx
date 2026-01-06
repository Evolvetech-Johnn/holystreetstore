import React, { useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon, 
  HeartIcon, 
  ShoppingBagIcon,
  UserIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
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
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { items } = useCart();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  const categories = [
    {
      name: 'Camisetas',
      items: ['Oversized', 'Boxy', 'T-Shirts', 'Lançamentos'],
      icon: '👕'
    },
    {
      name: 'Moletons',
      items: ['Hoodies', 'Crewnecks', 'Zipped', 'Limited'],
      icon: '🧥'
    },
    {
      name: 'Calças',
      items: ['Joggers', 'Cargo', 'Jeans', 'Shorts'],
      icon: '👖'
    },
    {
      name: 'Coleções',
      items: ['Propósito', 'Identidade', 'Caminho', 'Santo'],
      icon: '🔥'
    }
  ];

  return (
    <header className="bg-dark-primary text-white shadow-holy sticky top-0 z-50">
      {/* Top Banner (Netshoes style) */}
      <div className="bg-primary-pink text-white text-[10px] md:text-xs py-1.5 text-center font-bold tracking-widest uppercase">
        Frete Grátis em compras acima de R$ 299 • Ganhe um Holy Drop exclusivo
      </div>

      <div className={`${styles.container} py-4`}>
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <h1 className={`text-xl md:text-2xl font-black uppercase italic tracking-tighter ${componentStyles.gradientText}`}>
              Holy Street
            </h1>
          </div>

          {/* Search Bar (Netshoes style - Wide & Centered) */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <input 
              type="text"
              placeholder="Busque por produto, coleção ou versículo..."
              aria-label="Buscar produtos ou coleções"
              className="w-full bg-dark-secondary border border-gray-700 rounded-full py-2.5 px-6 pl-12 text-sm focus:outline-none focus:border-primary-pink focus:ring-1 focus:ring-primary-pink transition-all"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-4">
            <button 
              onClick={() => handleNavClick('profile')}
              className="hidden sm:flex flex-col items-center group" 
              aria-label="Minha Conta"
            >
              <UserIcon className="h-6 w-6 text-gray-300 group-hover:text-primary-pink transition-colors" aria-hidden="true" />
              <span className="text-[10px] text-gray-400 group-hover:text-white uppercase font-bold">Entrar</span>
            </button>
            
            <button 
              onClick={onToggleFavorites}
              className="flex flex-col items-center group p-1"
            >
              <HeartIcon className="h-6 w-6 text-gray-300 group-hover:text-primary-pink transition-colors" />
              <span className="hidden sm:block text-[10px] text-gray-400 group-hover:text-white uppercase font-bold">Favoritos</span>
            </button>

            <button 
              onClick={onToggleCart}
              className="flex flex-col items-center group p-1 relative"
            >
              <div className="relative">
                <ShoppingBagIcon className="h-6 w-6 text-gray-300 group-hover:text-primary-pink transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-pink text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-[10px] text-gray-400 group-hover:text-white uppercase font-bold">Carrinho</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation & Mega Menu Trigger */}
      <nav className="hidden md:block bg-dark-secondary border-t border-gray-800">
        <div className={`${styles.container} flex items-center justify-center`}>
          <div className="flex gap-8 py-3">
            <button 
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-primary-pink transition-all"
            >
              Categorias <ChevronDownIcon className="h-4 w-4" />
            </button>
            <button onClick={() => handleNavClick('catalog')} className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-primary-pink transition-all">Lançamentos</button>
            <button onClick={() => handleNavClick('catalog')} className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-primary-pink transition-all">Mais Vendidos</button>
            <button onClick={() => handleNavClick('catalog')} className="text-sm font-bold uppercase tracking-wider text-pink-400 hover:text-pink-300 transition-all font-black">Ofertas</button>
            <button onClick={() => handleNavClick('about')} className="text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-primary-pink transition-all">Sobre Nós</button>
          </div>
        </div>
      </nav>

      {/* Mega Menu Content */}
      {isMegaMenuOpen && (
        <div 
          className="hidden md:block absolute w-full bg-dark-secondary border-t border-gray-800 shadow-2xl animate-fade-in"
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className={`${styles.container} py-10 grid grid-cols-4 gap-12`}>
            {categories.map((cat) => (
              <div key={cat.name}>
                <h3 className="flex items-center gap-2 text-primary-pink font-black uppercase tracking-widest mb-6 text-sm">
                  <span className="text-xl">{cat.icon}</span> {cat.name}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <button 
                        onClick={() => handleNavClick('catalog')}
                        className="text-gray-400 hover:text-white hover:translate-x-2 transition-all text-sm font-medium"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-gray-900/50 py-4 text-center border-t border-gray-800">
            <button className="text-xs uppercase font-bold text-gray-500 hover:text-primary-pink transition-all">Ver todas as categorias →</button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <nav className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-dark-primary p-6 shadow-2xl border-r border-gray-800">
            <div className="flex items-center justify-between mb-8">
               <h1 className={`text-xl font-black uppercase italic tracking-tighter ${componentStyles.gradientText}`}>
                Holy Street
              </h1>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400">
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="mb-8">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-dark-secondary border border-gray-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-primary-pink"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick('home')} className="w-full text-left font-black uppercase tracking-widest text-lg text-white">Início</button></li>
              <li><button onClick={() => handleNavClick('catalog')} className="w-full text-left font-black uppercase tracking-widest text-lg text-white">Catálogo</button></li>
              <li><button onClick={() => handleNavClick('about')} className="w-full text-left font-black uppercase tracking-widest text-lg text-white">Sobre Nós</button></li>
              <li><button onClick={() => handleNavClick('contact')} className="w-full text-left font-black uppercase tracking-widest text-lg text-white">Contato</button></li>
            </ul>

            <div className="mt-12 pt-8 border-t border-gray-800">
               <button className="flex items-center gap-3 w-full bg-dark-secondary p-4 rounded-xl border border-gray-700 mb-4">
                  <UserIcon className="h-6 w-6 text-primary-pink" />
                  <span className="font-bold text-white uppercase tracking-widest">Minha Conta</span>
               </button>
               <div className="text-center text-xs text-gray-500 uppercase tracking-widest font-bold">
                  Carregamos Cristo no estilo de vida
               </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;