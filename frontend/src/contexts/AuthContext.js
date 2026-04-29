'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAPI } from '../services/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

/**
 * Decodifica o payload de um JWT (a parte do meio, base64url).
 */
function decodeJWTPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se tem token ao carregar a aplicação
    const token = localStorage.getItem('orquidea_token');
    if (token) {
      const payload = decodeJWTPayload(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        // Token ainda válido — reconstrói o user a partir dos claims
        setUser({
          id: payload.user_id,
          name: payload.name,
          role: payload.role,
        });
      } else {
        // Token expirado
        localStorage.removeItem('orquidea_token');
        localStorage.removeItem('orquidea_refresh');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await fetchAPI('/token/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Salva os tokens
      localStorage.setItem('orquidea_token', data.access);
      localStorage.setItem('orquidea_refresh', data.refresh);

      // Decodifica os claims customizados do Access Token
      const payload = decodeJWTPayload(data.access);
      const userData = {
        id: payload.user_id,
        name: payload.name,
        role: payload.role,
      };
      setUser(userData);

      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('orquidea_token');
    localStorage.removeItem('orquidea_refresh');
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
