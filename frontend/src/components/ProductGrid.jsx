import React from 'react';
import ProductCard from './ProductCard';
import ErrorBoundary from './ErrorBoundary';
import styles from '../styles/layout.module.css';

const ProductGrid = ({ products, onToggleFavorite, onQuickView, favorites = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className={`${styles.section} text-center`}>
        <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <section id="catalogo" className={styles.section}>
      <div className={styles.container}>
        <div className="text-center mb-12">
          <h2 className={`${styles.sectionTitle} mb-4`}>
            Nossos Produtos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de roupas que combinam fé e estilo urbano.
          </p>
        </div>

        <div className={`${styles.gridContainer} ${styles.gridCols4} gap-6`}>
          {products.map((product) => {
            // Additional safety check for product data
            if (!product || !product.id) {
              console.warn('Invalid product data:', product);
              return null;
            }

            return (
              <ErrorBoundary key={product.id}>
                <ProductCard
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  onQuickView={onQuickView}
                  isFavorite={favorites && favorites.includes(product.id)}
                />
              </ErrorBoundary>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;