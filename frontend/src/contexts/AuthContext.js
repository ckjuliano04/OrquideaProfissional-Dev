'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAPI } from '../services/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se tem token ao carregar a aplicação
    const token = localStorage.getItem('orquidea_token');
    if (token) {
      // Idealmente chama uma rota /api/me/ para validar o token
      fetchAPI('/users/me/')
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('orquidea_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Usa rota de token que fizemos no Django
      const data = await fetchAPI('/token/', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      localStorage.setItem('orquidea_token', data.access);
      
      // Decodifica o payload base64 ou faz nova requisição /me/
      // Como a API /token/ retorna o token, vamos puxar os dados do /me/
      const userData = await fetchAPI('/users/me/');
      setUser(userData);
      
      // Se for técnico/vendedor vai pro treinamento, se cliente vai pro catálogo logado
      router.push('/dashboard'); 
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('orquidea_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
