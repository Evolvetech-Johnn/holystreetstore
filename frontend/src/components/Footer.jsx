import React from 'react';
import styles from '../styles/layout.module.css';
import componentStyles from '../styles/components.module.css';

const Footer = ({ setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className={`${styles.container} py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-2xl font-black italic uppercase tracking-tighter mb-4 ${componentStyles.gradientText}`}>
              Holy Street
            </h3>
            <p className="text-gray-400 mb-6 max-w-md text-sm">
              Carregamos Cristo no estilo de vida. Moda streetwear com propósito, identidade e qualidade premium.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/holystreet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-secondary flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-pink transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807s.105-.595.315-.807c.21-.21.49-.315.807-.315s.595.105.807.315c.21.21.315.49.315.807s-.105.595-.315.807c-.21.193-.49.315-.807.315z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-secondary flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-green transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-primary-pink transition-colors">Início</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('catalog')} className="text-gray-400 hover:text-primary-pink transition-colors">Coleções</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-primary-pink transition-colors">Manifesto</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-primary-pink transition-colors">Contato</button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Ajuda</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button onClick={() => setCurrentPage('support-privacy')} className="text-gray-400 hover:text-white transition-colors">Privacidade</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('support-terms')} className="text-gray-400 hover:text-white transition-colors">Termos de Uso</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('support-shipping')} className="text-gray-400 hover:text-white transition-colors">Entregas</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('support-returns')} className="text-gray-400 hover:text-white transition-colors">Trocas</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {currentYear} Holy Street Store. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
               <img src="https://img.icons8.com/color/48/pix.png" alt="Pix" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
               <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
               <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;