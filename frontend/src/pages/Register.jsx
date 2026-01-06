import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
    EyeIcon, 
    EyeSlashIcon, 
    ArrowLeftIcon,
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import componentStyles from '../styles/components.module.css';

const Register = ({ setCurrentPage }) => {
  const { register, socialLogin, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        // Simple client-side validation, better to use error state
        alert('As senhas não coincidem');
        return;
    }

    const res = await register(formData.name, formData.email, formData.password);
    if (res.success) {
        setCurrentPage('profile');
    }
  };

  const handleSocial = async (provider) => {
    const res = await socialLogin(provider);
    if (res.success) {
        setCurrentPage('profile');
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4 relative overflow-hidden">
         {/* Background Decorative */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-pink/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-green/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-md bg-dark-secondary border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in">
            <button 
                onClick={() => setCurrentPage('login')}
                className="absolute top-6 left-6 text-gray-500 hover:text-white transition-colors"
            >
                <ArrowLeftIcon className="h-6 w-6" />
            </button>

            <div className="text-center mb-10">
                <h1 className={`text-3xl font-black uppercase italic tracking-tighter mb-2 ${componentStyles.gradientText}`}>
                    Crie sua Conta
                </h1>
                <p className="text-gray-400 text-sm">
                    Junte-se ao movimento e receba ofertas exclusivas.
                </p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold p-4 rounded-xl mb-6 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <UserIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Nome Completo"
                        required
                        className="w-full bg-dark-tertiary border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-primary-pink focus:ring-1 focus:ring-primary-pink outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div className="relative">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="email" 
                        placeholder="Seu E-mail"
                        required
                        className="w-full bg-dark-tertiary border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-primary-pink focus:ring-1 focus:ring-primary-pink outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>

                <div className="relative">
                    <LockClosedIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Sua Senha"
                        required
                        className="w-full bg-dark-tertiary border border-gray-700 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:border-primary-pink focus:ring-1 focus:ring-primary-pink outline-none transition-all"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>

                <div className="relative">
                    <LockClosedIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirme a Senha"
                        required
                        className="w-full bg-dark-tertiary border border-gray-700 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:border-primary-pink focus:ring-1 focus:ring-primary-pink outline-none transition-all"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className={`${componentStyles.btnPrimary} w-full py-4 text-sm mt-4`}
                >
                    {loading ? 'Criando Conta...' : 'Cadastrar'}
                </button>
            </form>

            <div className="mt-8">
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-dark-secondary text-gray-500 uppercase tracking-widest font-bold z-10">Ou registre com</span>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <button onClick={() => handleSocial('Google')} className="bg-white hover:bg-gray-100 py-3 rounded-xl flex items-center justify-center transition-all">
                        <img src="https://img.icons8.com/color/48/google-logo.png" className="h-6 w-6" alt="Google" />
                    </button>
                    <button onClick={() => handleSocial('Apple')} className="bg-black border border-gray-700 hover:border-gray-500 py-3 rounded-xl flex items-center justify-center transition-all">
                         <img src="https://img.icons8.com/ios-filled/50/ffffff/mac-os.png" className="h-6 w-6" alt="Apple" />
                    </button>
                    <button onClick={() => handleSocial('Instagram')} className="bg-gradient-to-br from-purple-600 to-pink-500 hover:opacity-90 py-3 rounded-xl flex items-center justify-center transition-all">
                         <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" className="h-6 w-6" alt="Instagram" />
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-xs">
                    Já tem uma conta?{' '}
                    <button 
                        onClick={() => setCurrentPage('login')}
                        className="font-bold text-white hover:text-primary-pink transition-colors uppercase tracking-wider"
                    >
                        Entrar
                    </button>
                </p>
            </div>
        </div>
    </div>
  );
};

export default Register;
