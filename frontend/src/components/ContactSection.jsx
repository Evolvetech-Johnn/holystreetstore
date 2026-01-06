import React, { useState } from 'react';
import { EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simular envio do newsletter
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contato" className={`${styles.section} bg-gray-800`}>
      <div className={styles.container}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-100">
            Entre em <span className={componentStyles.gradientText}>Contato</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo.
          </p>
        </div>

        <div className={`${styles.gridContainer} ${styles.gridCols2} gap-12`}>
          {/* Contact Information */}
          <div className={styles.spacingY}>
            <h3 className="text-2xl font-semibold mb-6 text-gray-100">Fale Conosco</h3>
            
            {/* Email */}
            <div className={`${componentStyles.card} p-6`}>
              <div className={`${styles.flexRow} items-center mb-4`}>
                <EnvelopeIcon className="w-6 h-6 text-primary-pink mr-3" />
                <h4 className="text-lg font-medium text-gray-100">Email</h4>
              </div>
              <p className="text-gray-400 mb-2">Para dúvidas e suporte:</p>
              <a 
                href="mailto:contato@holystreet.com.br" 
                className="text-primary-pink hover:text-primary-green transition-colors"
              >
                contato@holystreet.com.br
              </a>
            </div>

            {/* Instagram */}
            <div className={`${componentStyles.card} p-6`}>
              <div className={`${styles.flexRow} items-center mb-4`}>
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-pink mr-3" />
                <h4 className="text-lg font-medium text-gray-100">Instagram</h4>
              </div>
              <p className="text-gray-400 mb-2">Siga-nos para novidades:</p>
              <a 
                href="https://instagram.com/holystreet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-pink hover:text-primary-green transition-colors"
              >
                @holystreet
              </a>
            </div>

            {/* WhatsApp */}
            <div className={`${componentStyles.card} p-6`}>
              <div className={`${styles.flexRow} items-center mb-4`}>
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-pink mr-3" />
                <h4 className="text-lg font-medium text-gray-100">WhatsApp</h4>
              </div>
              <p className="text-gray-400 mb-2">Atendimento direto:</p>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-pink hover:text-primary-green transition-colors"
              >
                (11) 99999-9999
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className={`${componentStyles.card} p-8`}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Receba em primeira mão nossas novidades, promoções exclusivas e lançamentos.
            </p>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-green-400 text-lg font-medium mb-2">
                  ✓ Inscrição realizada com sucesso!
                </div>
                <p className="text-gray-400">
                  Obrigado por se inscrever em nossa newsletter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className={styles.spacingY}>
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Seu melhor email:
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className={componentStyles.inputField}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className={`${componentStyles.btnPrimary} w-full`}
                >
                  Inscrever-se
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;