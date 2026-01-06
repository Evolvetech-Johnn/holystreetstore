import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const HeroSection = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Nova Coleção 'Propósito'",
      subtitle: "Carregamos Cristo no estilo de vida. Peças oversized com tecido premium.",
      image: "/img/hero/propósito-banner.jpg",
      cta: "Ver Lançamentos",
      color: "from-primary-pink/80"
    },
    {
      id: 2,
      title: "Holy Drops Exclusivos",
      subtitle: "Cada peça acompanha um item de papelaria para o seu devocional.",
      image: "/img/hero/holy-drops.jpg",
      cta: "Saiba Mais",
      color: "from-primary-green/80"
    },
    {
      id: 3,
      title: "Streetwear que Edifica",
      subtitle: "Unindo a cultura urbana à mensagem do Reino.",
      image: "/img/hero/urban-kingdom.jpg",
      cta: "Explorar Tudo",
      color: "from-gray-900/80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden bg-dark-primary">
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent z-20`} />
            
            {/* Content Container */}
            <div className={`${styles.container} h-full relative z-30 flex flex-col justify-center`}>
              <div className="max-w-xl animate-fade-in px-4">
                <span className="inline-block bg-white text-dark-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] px-3 py-1 mb-6 rounded-sm">
                  Coleção Exclusiva
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight drop-shadow-2xl">
                   {slide.title.split("'")[0]}
                   <span className={componentStyles.gradientText}>
                      {slide.title.includes("'") ? `'${slide.title.split("'")[1]}'` : ''}
                   </span>
                </h2>
                <p className="text-sm md:text-xl text-gray-200 mb-8 font-medium max-w-md drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={onShopNow}
                    className={`${componentStyles.btnPrimary} !px-8 !py-4 text-sm font-black uppercase tracking-widest`}
                  >
                    {slide.cta}
                  </button>
                  <button className="hidden sm:block border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-sm font-black uppercase tracking-widest hover:bg-white hover:text-dark-primary transition-all">
                    Ver Vídeo
                  </button>
                </div>
              </div>
            </div>

            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-40 flex gap-4">
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="p-3 rounded-full bg-dark-primary/50 text-white border border-white/20 hover:bg-white hover:text-dark-primary transition-all backdrop-blur-md"
        >
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Próximo slide"
          className="p-3 rounded-full bg-dark-primary/50 text-white border border-white/20 hover:bg-white hover:text-dark-primary transition-all backdrop-blur-md"
        >
          <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentSlide ? 'w-12 bg-primary-pink' : 'w-4 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;