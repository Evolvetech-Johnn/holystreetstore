import React from 'react';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBackground}>
        <img 
          src="/images/hero-bg.jpg" 
          alt="Holy Street Fashion" 
          className={styles.heroImage}
        />
      </div>
      
      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1 className={`${styles.heroTitle} ${componentStyles.gradientText}`}>
          Holy Street
        </h1>
        <p className={styles.heroSubtitle}>
          Descubra a moda que expressa sua personalidade única. 
          Peças exclusivas para quem não tem medo de ser diferente.
        </p>
        <button className={`${componentStyles.btnPrimary} text-lg px-8 py-4`}>
          Explorar Coleção
        </button>
      </div>
    </section>
  );
};

export default HeroSection;