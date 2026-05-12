const { test, expect } = require('@playwright/test');

const API_BASE = 'http://localhost:8000';

const VALID_ADMIN = { email: 'admin@orquidea.com.br', password: 'Orquidea@2026' };
const INVALID_ADMIN = { email: 'admin@orquidea.com.br', password: 'wrongpassword' };
const NON_EXISTENT_USER = { email: 'ghost@teste.com', password: 'password123' };

test.describe('Phase 2: Authentication', () => {

  test('Login válido', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/`, { data: VALID_ADMIN });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.access).toBeDefined();
    expect(data.refresh).toBeDefined();
  });

  test('Login inválido (senha errada)', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/`, { data: INVALID_ADMIN });
    expect([401, 400]).toContain(response.status());
  });

  test('Login com usuário inexistente', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/`, { data: NON_EXISTENT_USER });
    expect([401, 400]).toContain(response.status());
  });

  test('Login com campo vazio', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/`, { data: { email: '', password: '' } });
    expect([400]).toContain(response.status());
  });

  test('Refresh token válido', async ({ request }) => {
    // 1. Get tokens
    const loginRes = await request.post(`${API_BASE}/api/token/`, { data: VALID_ADMIN });
    const { refresh } = await loginRes.json();
    
    // 2. Use refresh token
    const refreshRes = await request.post(`${API_BASE}/api/token/refresh/`, { data: { refresh } });
    expect(refreshRes.status()).toBe(200);
    const data = await refreshRes.json();
    expect(data.access).toBeDefined();
  });

  test('Refresh token inválido', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/refresh/`, { data: { refresh: 'invalid.token.string' } });
    expect([401, 400]).toContain(response.status());
  });

  test('/api/users/me/ com token válido', async ({ request }) => {
    const loginRes = await request.post(`${API_BASE}/api/token/`, { data: VALID_ADMIN });
    const { access } = await loginRes.json();
    
    const response = await request.get(`${API_BASE}/api/users/me/`, {
      headers: { 'Authorization': `Bearer ${access}` }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.email).toBe(VALID_ADMIN.email);
    expect(data.user_type).toBeDefined(); // Confirm token contains user_type via view
  });

  test('/api/users/me/ sem token', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/users/me/`);
    expect([401, 403]).toContain(response.status());
  });
  
  test('/api/users/me/ com token adulterado', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/users/me/`, {
      headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature` }
    });
    expect([401, 403]).toContain(response.status());
  });
});
