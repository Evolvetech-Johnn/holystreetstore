import React from 'react';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const About = () => {
  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                className="w-full h-full object-cover opacity-20"
                alt="Workspace"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-primary"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <span className="text-primary-pink text-sm font-black uppercase tracking-[0.4em] mb-4 block">Manifesto</span>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-4">
            Nossa <span className={componentStyles.gradientText}>História</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className={`${styles.container} py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-lg text-gray-400 font-medium leading-relaxed">
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

          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80" className="w-full aspect-[4/5] object-cover rounded-2xl border border-gray-800 shadow-holy" alt="Streetwear 1" />
                <img src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80" className="w-full aspect-square object-cover rounded-2xl border border-gray-800" alt="Streetwear 2" />
              </div>
              <div className="space-y-4 mt-12">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80" className="w-full aspect-square object-cover rounded-2xl border border-gray-800" alt="Streetwear 3" />
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" className="w-full aspect-[4/5] object-cover rounded-2xl border border-gray-800 shadow-holy" alt="Streetwear 4" />
              </div>
          </div>
        </div>

        {/* Pillar Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-dark-secondary rounded-3xl border border-gray-800 hover:border-primary-pink/50 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🕊️</div>
                <h3 className="text-xl font-black text-white uppercase italic mb-4">Identidade</h3>
                <p className="text-gray-500 text-sm">Roupas que expressam quem você é em Deus, sem abrir mão da relevância cultural.</p>
            </div>
            <div className="p-8 bg-dark-secondary rounded-3xl border border-gray-800 hover:border-primary-green/50 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">⚔️</div>
                <h3 className="text-xl font-black text-white uppercase italic mb-4">Propósito</h3>
                <p className="text-gray-500 text-sm">Cada drop é uma ferramenta de envangelismo e edificação pessoal.</p>
            </div>
            <div className="p-8 bg-dark-secondary rounded-3xl border border-gray-800 hover:border-accent-yellow/50 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">⚓</div>
                <h3 className="text-xl font-black text-white uppercase italic mb-4">Fé no Cotidiano</h3>
                <p className="text-gray-500 text-sm">O Evangelho vivido nas ruas, nas conversas e no estilo de vida urbano.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;