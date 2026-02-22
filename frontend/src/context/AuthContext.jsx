import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        console.log('🔑 Attempting login for:', email);
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log('✅ Login successful:', data.name);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            console.error('❌ Login failed:', error.message);
            return { success: false, message: error.response?.data?.message || 'Login failed: ' + error.message };
        }
    };

    const register = async (name, email, password) => {
        console.log('📝 Attempting registration for:', email);
        try {
            const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password });
            console.log('✅ Registration successful:', data.name);
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            console.error('❌ Registration failed:', error.message);
            return { success: false, message: error.response?.data?.message || 'Registration failed: ' + error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
