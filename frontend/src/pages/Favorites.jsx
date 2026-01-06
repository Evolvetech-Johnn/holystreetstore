import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const Favorites = () => {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      // Mock products data - in a real app, this would come from an API
      const mockProducts = [
        {
          id: 1,
          name: "Camiseta Holy Street Classic",
          price: 89.90,
          originalPrice: 129.90,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "camisetas",
          isNew: false,
          discount: 31
        },
        {
          id: 2,
          name: "Moletom Urban Vibes",
          price: 159.90,
          originalPrice: 199.90,
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "moletons",
          isNew: true,
          discount: 20
        },
        {
          id: 3,
          name: "Boné Street Faith",
          price: 49.90,
          originalPrice: 69.90,
          image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "acessorios",
          isNew: false,
          discount: 29
        },
        {
          id: 4,
          name: "Camiseta Fé",
          price: 79.90,
          originalPrice: 99.90,
          image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "camisetas",
          isNew: false,
          discount: 20
        },
        {
          id: 5,
          name: "Moletom Peace",
          price: 149.90,
          originalPrice: 189.90,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          category: "moletons",
          isNew: true,
          discount: 21
        }
      ];
      
      // Filter products that are in favorites
      const favProducts = mockProducts.filter(product => 
        favorites.includes(product.id)
      );
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFavoriteProducts(favProducts);
      setLoading(false);
    };

    loadFavorites();
  }, [favorites]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleToggleFavorite = (productId) => {
    toggleFavorite(productId);
  };

  const clearAllFavorites = () => {
    favoriteProducts.forEach(product => {
      toggleFavorite(product.id);
    });
  };

  if (loading) {
    return (
      <div className={`${styles.minHeight} ${styles.bgGray50}`}>
        <div className={`${styles.container} py-16`}>
          <div className={styles.textCenter}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-pink mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando seus favoritos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.minHeight} ${styles.bgGray50}`}>
      {/* Hero Section */}
      <div className="bg-white">
        <div className={`${styles.container} py-16`}>
          <div className={styles.textCenter}>
            <h1 className={styles.sectionTitle}>
              Meus Favoritos
            </h1>
            <p className={styles.sectionSubtitle}>
              {favoriteProducts.length > 0 
                ? `Você tem ${favoriteProducts.length} produto${favoriteProducts.length !== 1 ? 's' : ''} favorito${favoriteProducts.length !== 1 ? 's' : ''}`
                : 'Você ainda não tem produtos favoritos'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${styles.container} py-16`}>
        {favoriteProducts.length === 0 ? (
          // Empty State
          <div className={styles.textCenter}>
            <div className={`${componentStyles.card} p-12 max-w-md mx-auto`}>
              <div className="w-24 h-24 bg-gradient-to-br from-primary-pink/20 to-primary-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nenhum favorito ainda
              </h3>
              <p className="text-gray-600 mb-8">
                Explore nosso catálogo e adicione produtos aos seus favoritos clicando no ícone de coração.
              </p>
              <button 
                onClick={() => window.location.href = '/catalog'}
                className={componentStyles.btnPrimary}
              >
                Explorar Catálogo
              </button>
            </div>
          </div>
        ) : (
          // Products Grid
          <>
            {/* Header with actions */}
            <div className={`${styles.flexBetween} mb-8`}>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Seus Produtos Favoritos
                </h2>
                <p className="text-gray-600 mt-1">
                  {favoriteProducts.length} produto{favoriteProducts.length !== 1 ? 's' : ''} encontrado{favoriteProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {favoriteProducts.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className={`${componentStyles.btnOutline} text-sm`}
                >
                  Limpar Favoritos
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className={`${styles.gridContainer} ${styles.gridCols4} gap-6`}>
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>

            {/* Recommendations */}
            <div className="mt-16">
              <div className={`${componentStyles.card} p-8 bg-gradient-to-r from-primary-pink/10 to-primary-green/10`}>
                <div className={styles.textCenter}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Gostou dos seus favoritos?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Explore mais produtos similares em nosso catálogo e descubra novas peças que combinam com seu estilo.
                  </p>
                  <div className={`${styles.flexCenter} space-x-4`}>
                    <button 
                      onClick={() => window.location.href = '/catalog'}
                      className={componentStyles.btnPrimary}
                    >
                      Ver Mais Produtos
                    </button>
                    <button 
                      onClick={() => {
                        favoriteProducts.forEach(product => handleAddToCart(product));
                      }}
                      className={componentStyles.btnSecondary}
                    >
                      Adicionar Todos ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;