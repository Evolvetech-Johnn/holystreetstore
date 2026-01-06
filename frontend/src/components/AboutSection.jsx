import React from 'react';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const AboutSection = () => {
  return (
    <section id="sobre" className={`${styles.section} bg-gray-900`}>
      <div className={styles.container}>
        <div className={`${styles.gridContainer} ${styles.gridCols2} items-center gap-12`}>
          {/* Text Content */}
          <div className={styles.spacingY}>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-4`}>
              Sobre a <span className={componentStyles.gradientText}>Holy Street</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                A Holy Street nasceu da paixão por criar peças únicas que refletem 
                personalidade e estilo. Acreditamos que a moda é uma forma de 
                expressão pessoal e deve ser acessível a todos.
              </p>
              <p>
                Nossa missão é oferecer roupas de qualidade, com designs exclusivos 
                e preços justos. Cada peça é cuidadosamente selecionada para garantir 
                que você se sinta confiante e autêntico.
              </p>
              <p>
                Junte-se à nossa comunidade e descubra um novo jeito de se vestir. 
                Na Holy Street, você não apenas compra roupas, você investe no seu estilo.
              </p>
            </div>
            <button className={componentStyles.btnSecondary}>
              Conheça Nossa História
            </button>
          </div>
          
          {/* Image Content */}
          <div className="relative">
            <div className={`${componentStyles.card} overflow-hidden`}>
              <img 
                src="/images/about-image.jpg" 
                alt="Sobre Holy Street" 
                className="w-full h-96 object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-pink to-primary-green rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-green to-primary-pink rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;