const { test, expect } = require('@playwright/test');

const API_BASE = 'http://localhost:8000';

test.describe('Phase 8 & 12: Treinamentos e Segurança', () => {

  test('Acesso direto indevido por ID ao treinamento (Sem token) deve falhar', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/portal/training/1/`);
    expect([401, 403, 404]).toContain(res.status()); // 404 is also acceptable if it hides existence
  });

  test('Upload de extensões proibidas ou SQLi (Sanity Check na API)', async ({ request }) => {
    // Tentando SQLi via slug
    const resSqli = await request.get(`${API_BASE}/api/products/' OR 1=1--/`);
    expect(resSqli.status()).not.toBe(500); // Should handle gracefully
    
    // Tentando Path Traversal
    const resPath = await request.get(`${API_BASE}/api/products/../../../etc/passwd/`);
    expect(resPath.status()).not.toBe(500);
  });

  test('Erros não retornam 500 com traceback', async ({ request }) => {
    // Forcing a bad payload to a POST
    const res = await request.post(`${API_BASE}/api/token/`, { data: "NOT JSON" });
    expect(res.status()).not.toBe(500);
    const bodyText = await res.text();
    expect(bodyText).not.toContain('Traceback');
  });
});
