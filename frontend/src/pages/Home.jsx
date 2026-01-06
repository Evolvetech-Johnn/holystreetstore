import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const { products, toggleFavorite, addToCart } = useProducts();
  
  // Get featured products (first 6 products for demo)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section id="produtos" className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
              Produtos em{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Destaque
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubra nossa seleção especial de peças que combinam fé e estilo urbano
            </p>
          </div>
          
          <ProductGrid
            products={featuredProducts}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;