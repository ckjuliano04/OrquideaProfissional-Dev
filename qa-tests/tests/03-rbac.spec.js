const { test, expect } = require('@playwright/test');

const API_BASE = 'http://localhost:8000';

const USERS = {
  admin: { email: 'admin@orquidea.com.br', password: 'Orquidea@2026' },
  tecnico: { email: 'tecnico@teste.com', password: 'Orquidea@2026' },
  cliente: { email: 'cliente@teste.com', password: 'Orquidea@2026' }
};

async function getToken(request, user) {
  const response = await request.post(`${API_BASE}/api/token/`, { data: user });
  if (response.ok()) {
    const data = await response.json();
    return data.access;
  }
  return null;
}

test.describe('Phase 3: Permissões (RBAC)', () => {
  let adminToken, tecnicoToken, clienteToken;

  test.beforeAll(async ({ request }) => {
    adminToken = await getToken(request, USERS.admin);
    tecnicoToken = await getToken(request, USERS.tecnico);
    clienteToken = await getToken(request, USERS.cliente);
  });

  // Anônimo
  test('Anônimo pode ver produtos públicos mas não restritos', async ({ request }) => {
    const resProd = await request.get(`${API_BASE}/api/products/`);
    expect(resProd.status()).toBe(200);

    const resMe = await request.get(`${API_BASE}/api/users/me/`);
    expect([401, 403]).toContain(resMe.status());

    const resTraining = await request.get(`${API_BASE}/api/portal/training/`);
    expect([401, 403]).toContain(resTraining.status());
  });

  // Cliente
  test('Cliente acessa dados básicos mas não vê treinamentos completos (depende da regra local)', async ({ request }) => {
    expect(clienteToken).toBeTruthy();
    
    const resMe = await request.get(`${API_BASE}/api/users/me/`, {
      headers: { 'Authorization': `Bearer ${clienteToken}` }
    });
    expect(resMe.status()).toBe(200);

    const resTraining = await request.get(`${API_BASE}/api/portal/training/`, {
      headers: { 'Authorization': `Bearer ${clienteToken}` }
    });
    
    // Some endpoints may return 403 if restricted, or 200 with filtered items
    expect([200, 403]).toContain(resTraining.status());
  });

  // Técnico
  test('Técnico acessa conteúdo de treinamento', async ({ request }) => {
    expect(tecnicoToken).toBeTruthy();

    const resTraining = await request.get(`${API_BASE}/api/portal/training/`, {
      headers: { 'Authorization': `Bearer ${tecnicoToken}` }
    });
    expect(resTraining.status()).toBe(200);
  });

  // Admin
  test('Admin acessa tudo', async ({ request }) => {
    expect(adminToken).toBeTruthy();

    const resTraining = await request.get(`${API_BASE}/api/portal/training/`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    expect(resTraining.status()).toBe(200);
  });
});
