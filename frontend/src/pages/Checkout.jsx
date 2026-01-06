import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { 
    CreditCardIcon, 
    TruckIcon, 
    CheckCircleIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import componentStyles from '../styles/components.module.css';

const Checkout = ({ setCurrentPage }) => {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'pix'
  });

  const pixDiscount = cartTotal * 0.1;
  const finalTotal = formData.paymentMethod === 'pix' ? cartTotal - pixDiscount : cartTotal;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
        clearCart();
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
    return (
        <div className="min-h-screen bg-dark-primary flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-black text-white uppercase italic mb-6">Seu carrinho está vazio</h2>
            <button 
                onClick={() => setCurrentPage('catalog')}
                className={componentStyles.btnPrimary}
            >
                Explorar Coleções
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((s) => (
                <div 
                    key={s} 
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                        step >= s ? 'bg-primary-pink text-white shadow-holy' : 'bg-dark-secondary text-gray-600 border border-gray-800'
                    }`}
                >
                    {s}
                </div>
            ))}
        </div>

        {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in">
                <div className="space-y-8">
                    <h2 className="text-3xl font-black text-white uppercase italic">Informações <span className={componentStyles.gradientText}>Pessoais</span></h2>
                    <form className="space-y-4">
                        <input 
                            type="text" placeholder="Nome Completo" 
                            className="w-full bg-dark-secondary border border-gray-800 rounded-xl p-4 text-white focus:border-primary-pink outline-none"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                            type="email" placeholder="E-mail" 
                            className="w-full bg-dark-secondary border border-gray-800 rounded-xl p-4 text-white focus:border-primary-pink outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                type="text" placeholder="CEP" 
                                className="w-full bg-dark-secondary border border-gray-800 rounded-xl p-4 text-white focus:border-primary-pink outline-none"
                            />
                            <input 
                                type="text" placeholder="Cidade" 
                                className="w-full bg-dark-secondary border border-gray-800 rounded-xl p-4 text-white focus:border-primary-pink outline-none"
                            />
                        </div>
                        <textarea 
                            placeholder="Endereço Completo" 
                            className="w-full bg-dark-secondary border border-gray-800 rounded-xl p-4 text-white focus:border-primary-pink outline-none h-32"
                        />
                    </form>
                </div>

                <div className="bg-dark-secondary p-8 rounded-3xl border border-gray-800 h-fit space-y-6">
                    <h3 className="text-xl font-black text-white uppercase italic">Resumo do Pedido</h3>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-white uppercase truncate max-w-[150px]">{item.name}</div>
                                    <div className="text-[10px] text-gray-500">{item.quantity}x R$ {item.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-gray-800 space-y-2">
                        <div className="flex justify-between text-gray-400 text-sm">
                            <span>Subtotal</span>
                            <span>R$ {cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400 text-sm">
                            <span>Frete</span>
                            <span className="text-primary-green">Grátis</span>
                        </div>
                        <div className="flex justify-between text-white font-black text-xl pt-4">
                            <span>Total</span>
                            <span>R$ {cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setStep(2)}
                        className={`${componentStyles.btnPrimary} w-full`}
                    >
                        Continuar para Pagamento
                    </button>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                    <ArrowLeftIcon className="h-4 w-4" /> Voltar
                </button>
                <h2 className="text-3xl font-black text-white uppercase italic">Forma de <span className={componentStyles.gradientText}>Pagamento</span></h2>
                
                <div className="grid grid-cols-1 gap-4">
                    <button 
                        onClick={() => setFormData({...formData, paymentMethod: 'pix'})}
                        className={`p-6 rounded-2xl border transition-all flex items-center justify-between ${
                            formData.paymentMethod === 'pix' ? 'bg-primary-pink/10 border-primary-pink' : 'bg-dark-secondary border-gray-800 grayscale hover:grayscale-0'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">⚡</span>
                            <div className="text-left">
                                <div className="text-white font-black uppercase">Pix (Recomendado)</div>
                                <div className="text-[10px] text-primary-green font-bold">GANHE 10% DE DESCONTO</div>
                            </div>
                        </div>
                        <div className="text-lg font-black text-white">R$ {(cartTotal * 0.9).toFixed(2)}</div>
                    </button>

                    <button 
                        onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                        className={`p-6 rounded-2xl border transition-all flex items-center justify-between ${
                            formData.paymentMethod === 'card' ? 'bg-primary-pink/10 border-primary-pink' : 'bg-dark-secondary border-gray-800 grayscale hover:grayscale-0'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <CreditCardIcon className="h-8 w-8 text-white" />
                            <div className="text-left">
                                <div className="text-white font-black uppercase">Cartão de Crédito</div>
                                <div className="text-[10px] text-gray-500">Até 12x sem juros</div>
                            </div>
                        </div>
                        <div className="text-lg font-black text-white">R$ {cartTotal.toFixed(2)}</div>
                    </button>
                </div>

                <div className="bg-dark-tertiary p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                    <TruckIcon className="h-6 w-6 text-primary-pink" />
                    <div>
                        <div className="text-xs font-black text-white uppercase">Frete Holy Speed</div>
                        <div className="text-[10px] text-gray-500">Entrega estimada em 3-5 dias úteis.</div>
                    </div>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    className={`${componentStyles.btnPrimary} w-full py-6 text-lg`}
                >
                    Finalizar Pedido
                </button>
            </div>
        )}

        {step === 3 && (
            <div className="text-center py-20 space-y-6 animate-scale-in">
                <div className="w-24 h-24 bg-primary-green/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircleIcon className="h-16 w-16 text-primary-green" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
                   Pedido <span className={componentStyles.gradientText}>Confirmado!</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Obrigado por carregar Cristo no estilo de vida. Enviamos um e-mail com os detalhes do seu drops exclusivo.
                </p>
                <div className="pt-12">
                     <button 
                        onClick={() => setCurrentPage('home')}
                        className={componentStyles.btnSecondary}
                    >
                        Voltar para Início
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
