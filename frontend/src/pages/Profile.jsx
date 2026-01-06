import React, { useState, useEffect } from 'react';
import { 
    ClockIcon, 
    ShoppingBagIcon, 
    ArrowRightIcon,
    UserCircleIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import componentStyles from '../styles/components.module.css';

import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const Profile = ({ setCurrentPage }) => {
  const { user, logout } = useAuth();
  const { allProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('orders');
  
  // Mock order history
  const orders = user?.orders || [];

  // Favorites logic
  const favoritesIds = user?.favorites || [];
  // Ensure we compare compatible types (e.g. string vs number)
  const favoriteProducts = allProducts ? allProducts.filter(p => favoritesIds.map(String).includes(String(p.id))) : [];
  const favoritesCount = favoriteProducts.length; // Use the actual resolved count

  return (
    <div className="min-h-screen bg-dark-primary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 space-y-4">
                <div className="bg-dark-secondary p-8 rounded-3xl border border-gray-800 text-center mb-8">
                    <div className="w-20 h-20 bg-primary-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCircleIcon className="h-12 w-12 text-primary-pink" />
                    </div>
                    <h2 className="text-white font-black uppercase text-sm">{user?.name || 'Visitante'}</h2>
                    <p className="text-gray-500 text-[10px] font-bold">{user?.email || 'email@exemplo.com'}</p>
                </div>

                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center justify-between p-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                        activeTab === 'orders' ? 'bg-primary-pink text-white shadow-holy' : 'bg-dark-secondary text-gray-500 hover:text-white border border-gray-800'
                    }`}
                >
                    <div className="flex items-center gap-3"><ShoppingBagIcon className="h-4 w-4" /> Meus Pedidos</div>
                    <ArrowRightIcon className="h-3 w-3" />
                </button>

                <button 
                    onClick={() => setActiveTab('favorites')}
                    className={`w-full flex items-center justify-between p-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                        activeTab === 'favorites' ? 'bg-primary-pink text-white shadow-holy' : 'bg-dark-secondary text-gray-500 hover:text-white border border-gray-800'
                    }`}
                >
                    <div className="flex items-center gap-3"><HeartIcon className="h-4 w-4" /> Favoritos ({favoritesCount})</div>
                    <ArrowRightIcon className="h-3 w-3" />
                </button>
                
                <button 
                    onClick={() => {
                        logout();
                        setCurrentPage('home');
                    }}
                    className="w-full text-left p-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 rounded-xl transition-all"
                >
                    Sair da Conta
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-8 animate-fade-in">
                {activeTab === 'orders' && (
                    <>
                        <h2 className="text-3xl font-black text-white uppercase italic">Histórico de <span className={componentStyles.gradientText}>Pedidos</span></h2>
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <div className="text-center py-12 bg-dark-secondary rounded-3xl border border-gray-800">
                                    <ShoppingBagIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 text-sm mb-4">Você ainda não fez nenhum pedido.</p>
                                    <button 
                                        onClick={() => setCurrentPage('catalog')}
                                        className={componentStyles.btnPrimary}
                                    >
                                        Começar a Comprar
                                    </button>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order.id} className="bg-dark-secondary p-6 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-700 transition-all">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-12 h-12 bg-dark-tertiary rounded-xl flex items-center justify-center">
                                                <ClockIcon className="h-6 w-6 text-gray-500" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-white uppercase mb-1">{order.id}</div>
                                                <div className="text-[10px] text-gray-500 font-bold uppercase">{order.date}</div>
                                            </div>
                                        </div>

                                        <div className="flex-1 border-y md:border-y-0 md:border-x border-gray-800 py-4 md:py-0 md:px-10">
                                            <div className="text-xs font-bold text-gray-300 mb-1">{order.items.join(", ")}</div>
                                            <div className="text-[10px] font-black uppercase text-gray-500">Total: R$ {order.total.toFixed(2)}</div>
                                        </div>

                                        <div className="text-right">
                                            <div className={`text-[10px] font-black uppercase px-3 py-1 bg-white/5 rounded-full inline-block ${order.color}`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'favorites' && (
                    <div className="space-y-6">
                        {favoritesCount === 0 ? (
                             <div className="text-center py-20">
                                <HeartIcon className="h-16 w-16 text-primary-pink mx-auto opacity-20 mb-6" />
                                <h2 className="text-xl font-black text-white uppercase italic mb-4">Seus itens favoritos aparecerão aqui.</h2>
                                <button 
                                    onClick={() => setCurrentPage('catalog')}
                                    className={componentStyles.btnPrimary}
                                >
                                    Ver Catálogo
                                </button>
                             </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favoriteProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

        </div>
      </div>
    </div>
  );
};

export default Profile;
