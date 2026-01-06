import React, { useState } from 'react';
import componentStyles from '../styles/components.module.css';

const SupportPages = ({ page = 'privacy', setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState(page);

  const tabs = [
    { id: 'privacy', label: 'Privacidade' },
    { id: 'terms', label: 'Termos' },
    { id: 'shipping', label: 'Entregas' },
    { id: 'returns', label: 'Trocas' }
  ];

  return (
    <div className="min-h-screen bg-dark-primary py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-12 text-center">
            Central de <span className={componentStyles.gradientText}>Ajuda</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                        activeTab === tab.id 
                            ? 'bg-primary-pink text-white shadow-holy' 
                            : 'bg-dark-secondary text-gray-400 hover:text-white border border-gray-800'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        <div className="bg-dark-secondary p-8 md:p-12 rounded-3xl border border-gray-800 text-gray-400 leading-relaxed text-sm md:text-base animate-fade-in">
            {activeTab === 'privacy' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white uppercase italic">Política de Privacidade</h2>
                    <p>A Holy Street valoriza sua privacidade. Todas as informações coletadas são usadas exclusivamente para processar seu pedido e melhorar sua experiência de compra.</p>
                    <p>Nunca compartilhamos seus dados com terceiros para fins de marketing não autorizados.</p>
                </div>
            )}

            {activeTab === 'terms' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white uppercase italic">Termos de Uso</h2>
                    <p>Ao acessar o site Holy Street, você concorda com nossos termos. Nossos produtos são destinados a uso pessoal.</p>
                    <p>O conteúdo deste site (fotos, textos, logos) é propriedade exclusiva da Holy Street.</p>
                </div>
            )}

            {activeTab === 'shipping' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white uppercase italic">Política de Entrega</h2>
                    <p>Enviamos para todo o Brasil via Correios e Transportadoras parceiras.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Holy Speed:</strong> Entrega expressa para capitais (2-4 dias úteis).</li>
                        <li><strong>Standard:</strong> Entrega econômica (5-10 dias úteis).</li>
                    </ul>
                    <p>O prazo começa a contar após a confirmação do pagamento.</p>
                </div>
            )}

            {activeTab === 'returns' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white uppercase italic">Trocas e Devoluções</h2>
                    <p>Se a peça não servir ou não curtiu, relaxa. Você tem até 7 dias após o recebimento para solicitar a devolução e até 30 dias para troca.</p>
                    <p>O produto deve estar com a etiqueta e sem sinais de uso.</p>
                    <button className="text-primary-pink font-bold underline">Iniciar Processo de Troca</button>
                </div>
            )}
        </div>

        <div className="mt-12 text-center">
             <button 
                onClick={() => setCurrentPage('contact')}
                className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest border-b border-gray-700 pb-1"
            >
                Ainda tem dúvidas? Fale com a gente.
            </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPages;
