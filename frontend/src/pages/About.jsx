import React from 'react';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const About = () => {
  return (
    <div className={`${styles.minHeight} ${styles.bgGray50}`}>
      {/* Hero Section */}
      <div className="bg-white">
        <div className={`${styles.container} py-16`}>
          <div className={styles.textCenter}>
            <h1 className={styles.sectionTitle}>
              Sobre a Holy Street
            </h1>
            <p className={styles.sectionSubtitle}>
              Conheça nossa história, missão e valores que nos tornam únicos no mundo do streetwear.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${styles.container} py-16`}>
        <div className={`${styles.gridContainer} ${styles.gridCols2} items-center gap-12`}>
          {/* Text Content */}
          <div className={styles.spacingY}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nossa História
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                A Holy Street nasceu da paixão pela cultura urbana e pela expressão individual através da moda. 
                Fundada em 2020, nossa marca representa a fusão perfeita entre estilo, qualidade e autenticidade.
              </p>
              <p>
                Acreditamos que cada peça de roupa conta uma história única. Por isso, criamos designs exclusivos 
                que refletem a diversidade e a criatividade da cultura de rua, sempre com materiais de alta qualidade 
                e acabamento impecável.
              </p>
              <p>
                Nossa missão é empoderar jovens e adultos a expressarem sua personalidade através de roupas que 
                combinam conforto, estilo e durabilidade. Cada coleção é cuidadosamente desenvolvida para atender 
                às necessidades de quem vive intensamente a vida urbana.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Sobre a Holy Street"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-pink to-primary-green rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-green to-primary-pink rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className={styles.textCenter}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Os princípios que guiam cada decisão e cada criação da Holy Street.
            </p>
          </div>

          <div className={`${styles.gridContainer} ${styles.gridCols3} gap-8`}>
            <div className={`${componentStyles.card} p-8 text-center`}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-pink to-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Autenticidade</h3>
              <p className="text-gray-600">
                Criamos designs únicos que refletem a verdadeira essência da cultura urbana, 
                sem seguir apenas tendências passageiras.
              </p>
            </div>

            <div className={`${componentStyles.card} p-8 text-center`}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-primary-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualidade</h3>
              <p className="text-gray-600">
                Utilizamos apenas materiais premium e técnicas de confecção que garantem 
                durabilidade e conforto em cada peça.
              </p>
            </div>

            <div className={`${componentStyles.card} p-8 text-center`}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-pink to-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunidade</h3>
              <p className="text-gray-600">
                Valorizamos nossa comunidade e criamos conexões genuínas com nossos clientes, 
                ouvindo suas necessidades e desejos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className={`${componentStyles.card} p-12 bg-gradient-to-r from-primary-pink/10 to-primary-green/10`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Faça Parte da Nossa História
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubra nossa coleção exclusiva e encontre peças que representam seu estilo único. 
              Junte-se à comunidade Holy Street e vista sua personalidade.
            </p>
            <button className={componentStyles.btnPrimary}>
              Explorar Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;