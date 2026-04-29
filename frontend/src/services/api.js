const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchAPI(endpoint, options = {}) {
  // Pega o token do localStorage
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('orquidea_token');
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    // Trata erros globais (ex: 401 Unauthorized)
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('orquidea_token');
      // Redirecionamento pode ser gerido pelo contexto
    }
    
    let errorMsg = 'Erro na requisição';
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorMsg;
    } catch(e) {}
    
    throw new Error(errorMsg);
  }

  if (response.status === 204) {
    return null; // No content
  }

  return response.json();
}
