import React from 'react';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-dark-primary">
      <div className={styles.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Text Content */}
          <div className="animate-fade-in px-4">
            <span className="text-primary-pink text-xs font-black uppercase tracking-[.3em] mb-4 block">
              Quem somos
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">
              Carregamos <span className={componentStyles.gradientText}>Cristo</span> no estilo de vida
            </h2>
            <div className="space-y-6 text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              <p>
                A <strong className="text-white italic">Holy Street</strong> nasceu do desejo de unir fé e estilo em um só movimento. 
                Somos uma marca de streetwear cristã que acredita que a moda vai muito além da aparência — 
                ela é uma forma de expressar identidade, propósito e fé no dia a dia.
              </p>
              <p>
                Carregamos a mensagem do Evangelho de forma autêntica, urbana e inspiradora. 
                Cada coleção é pensada para transmitir valores e despertar conversas que apontem para Cristo, 
                mostrando que é possível viver com atitude, relevância e espiritualidade sem abrir mão do estilo.
              </p>
              <p>
                Nosso slogan, <span className="text-primary-pink font-bold italic">“Carregamos Cristo no estilo de vida”</span>, 
                reflete quem somos: não apenas roupas, mas uma forma de viver. Além disso, cada peça acompanha um 
                <strong className="text-white"> Holy Drop</strong> — um item exclusivo de papelaria cristã que incentiva a 
                prática do devocional e fortalece a caminhada de fé.
              </p>
              <p>
                A Holy Street não é só moda, é movimento. É o encontro entre a cultura urbana e o Reino, 
                para marcar gerações e mostrar que a verdadeira essência do streetwear está em carregar Cristo 
                em cada detalhe da vida.
              </p>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="relative group px-4">
            <div className="relative overflow-hidden rounded-3xl shadow-holy">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Holy Street Culture" 
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-primary via-transparent to-transparent opacity-60"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-2 md:right-10 bg-dark-secondary p-6 rounded-2xl border border-gray-800 shadow-2xl animate-bounce-slow">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-pink rounded-full flex items-center justify-center text-2xl">🔥</div>
                    <div>
                        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Desde</div>
                        <div className="text-lg font-black text-white italic">2023</div>
                    </div>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;