import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import componentStyles from '../styles/components.module.css';

const Home = ({ setCurrentPage }) => {
  const { products, toggleFavorite, addToCart, loading } = useProducts();
  
  // Get featured products
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const categories = [
    { name: 'Camisetas', icon: '👕', image: '/img/cats/tshirts.jpg' },
    { name: 'Moletons', icon: '🧥', image: '/img/cats/hoodies.jpg' },
    { name: 'Calças', icon: '👖', image: '/img/cats/pants.jpg' },
    { name: 'Acessórios', icon: '🧢', image: '/img/cats/acc.jpg' }
  ];

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Hero Carousel */}
      <HeroSection onShopNow={() => setCurrentPage('catalog')} />

      {/* Quick Categories (Netshoes Style) */}
      <section className="py-12 bg-dark-secondary border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex justify-center flex-wrap gap-6 md:gap-12">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setCurrentPage('catalog')}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-dark-tertiary border-2 border-gray-800 flex items-center justify-center text-3xl md:text-5xl group-hover:border-primary-pink group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {cat.icon}
                </div>
                <span className="mt-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-primary-pink transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <span className="text-primary-pink text-xs font-black uppercase tracking-[0.3em] mb-2 block">
                    Os mais desejados
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                    Drops em <span className={componentStyles.gradientText}>Destaque</span>
                </h2>
            </div>
            <button 
                onClick={() => setCurrentPage('catalog')}
                className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white border-b-2 border-primary-pink pb-1 transition-all"
            >
                Ver coleção completa →
            </button>
          </div>
          
          <ProductGrid
            products={featuredProducts}
            loading={loading}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
        </div>
      </section>

      {/* Holy Drops Promo */}
      <section className="py-20 bg-gradient-to-br from-primary-pink/20 to-transparent border-t border-primary-pink/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic mb-6">Cada peça conta uma história</h3>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Não enviamos apenas roupas. Cada pedido acompanha um <span className="text-primary-pink font-bold">Holy Drop</span> exclusivo: itens de papelaria cristã para fortalecer seu momento com Deus.
            </p>
            <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center">
                    <span className="text-3xl mb-2">📖</span>
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Planos Devocionais</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl mb-2">🔖</span>
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Bookmarks</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl mb-2">✉️</span>
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Cartas Proféticas</span>
                </div>
            </div>
        </div>
      </section>

      {/* About & Contact */}
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Home;