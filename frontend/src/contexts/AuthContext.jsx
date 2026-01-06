import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('holy_street_token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial check for existing token
    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    // In a real app, verify token validity with backend
                    // For now, we'll assume it's valid if it exists, or decode it locally
                    // Ideally: const res = await fetch('http://localhost:5000/api/auth/profile', ...);
                    
                    // Let's try to fetch profile to validate
                    const res = await fetch('http://localhost:5000/api/auth/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    }).catch(() => null);

                    if (res && res.ok) {
                        const data = await res.json();
                        setUser(data.data);
                        setIsAuthenticated(true);
                    } else if (res && res.status === 401) {
                         // Token expired
                         logout();
                    } else {
                        // Backend unreachable and token exists but validation failed or timed out.
                        // Ideally we should logout, or keep the token and try again later.
                        // For now, let's just NOT set a user, so they effectively stay 'logged out' until they try again
                        // or until we implement offline persistence better.
                        console.warn('Backend unreachable during auth check.');
                        // We do NOT set user here to avoid "phantom" logins.
                    }
                } catch (err) {
                    console.error("Auth Init Error", err);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Falha ao fazer login');
            }

            setToken(data.data.token);
            setUser(data.data.user);
            setIsAuthenticated(true);
            localStorage.setItem('holy_street_token', data.data.token);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Falha ao registrar');
            }

            setToken(data.data.token);
            setUser(data.data.user);
            setIsAuthenticated(true);
            localStorage.setItem('holy_street_token', data.data.token);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('holy_street_token');
    };

    const forgotPassword = async (email) => {
        // Mock implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: `Um link de redefinição foi enviado para ${email}` });
            }, 1500);
        });
    };

    const socialLogin = async (provider) => {
        // Mock implementation
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: 'social-123',
                    name: `Visitante (${provider})`, // Updated to be less "debug" like
                    email: `visitante@${provider.toLowerCase()}.com`,
                    role: 'user',
                    avatar: provider === 'Google' ? 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' : null,
                    orders: [], // Social login starts fresh
                    favorites: [] // Social login favorites
                };
                setUser(mockUser);
                setToken('mock-social-token');
                setIsAuthenticated(true);
                localStorage.setItem('holy_street_token', 'mock-social-token');
                setLoading(false);
                resolve({ success: true });
            }, 1500);
        });
    };

    const toggleFavorite = (productId) => {
        if (!user) return;
        
        const currentFavorites = user.favorites || [];
        const newFavorites = currentFavorites.includes(productId)
            ? currentFavorites.filter(id => id !== productId)
            : [...currentFavorites, productId];
        
        // Update local state
        setUser({ ...user, favorites: newFavorites });
        
        // In a real app, send API request here
        // await fetch('/api/auth/favorites', { method: 'POST', body: { productId } ... })
    };

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        socialLogin,
        toggleFavorite
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
