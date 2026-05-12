const { test, expect } = require('@playwright/test');

const API_BASE = 'http://localhost:8000';

test.describe('Phase 1: Smoke Tests da API', () => {
  const publicEndpoints = [
    '/api/products/',
    '/api/products/categories/',
    '/api/cms/home/',
    '/api/content/stores/',
  ];

  const restrictedEndpoints = [
    '/api/portal/training/',
    '/api/users/me/'
  ];

  for (const ep of publicEndpoints) {
    test(`GET public endpoint ${ep} should return 200`, async ({ request }) => {
      const response = await request.get(`${API_BASE}${ep}`);
      
      expect(response.status()).not.toBe(500);
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();

      const json = await response.json();
      expect(json).toBeDefined();
      
      // Ensure no traceback leaked
      const bodyText = await response.text();
      expect(bodyText).not.toContain('Traceback (most recent call last)');
      expect(bodyText).not.toContain('C:\\');
    });
  }

  for (const ep of restrictedEndpoints) {
    test(`GET restricted endpoint ${ep} without token should be 401/403`, async ({ request }) => {
      const response = await request.get(`${API_BASE}${ep}`);
      
      expect(response.status()).not.toBe(500);
      expect([401, 403]).toContain(response.status());
      
      // Ensure no traceback leaked
      const bodyText = await response.text();
      expect(bodyText).not.toContain('Traceback (most recent call last)');
    });
  }

  test('POST /api/token/ without body should handle gracefully (400 or 401)', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/`, { data: {} });
    expect(response.status()).not.toBe(500);
    expect([400, 401]).toContain(response.status());
  });

  test('POST /api/token/refresh/ without body should handle gracefully (400 or 401)', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/token/refresh/`, { data: {} });
    expect(response.status()).not.toBe(500);
    expect([400, 401]).toContain(response.status());
  });
});
