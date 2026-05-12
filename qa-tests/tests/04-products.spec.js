const { test, expect } = require('@playwright/test');

const API_BASE = 'http://localhost:8000';

test.describe('Phase 4: Produtos', () => {

  test('Listagem de produtos e Categorias', async ({ request }) => {
    const resProd = await request.get(`${API_BASE}/api/products/`);
    expect(resProd.status()).toBe(200);
    const prodData = await resProd.json();
    expect(Array.isArray(prodData.results || prodData)).toBeTruthy();

    const resCat = await request.get(`${API_BASE}/api/products/categories/`);
    expect(resCat.status()).toBe(200);
  });

  test('Detalhe de produto inexistente deve retornar 404', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/products/slug-fantasma-12345/`);
    expect(res.status()).toBe(404);
  });

  test('Validação estrutural do detalhe do produto (is_main não deve ser usado)', async ({ request }) => {
    // Get a valid slug first
    const resProd = await request.get(`${API_BASE}/api/products/`);
    const data = await resProd.json();
    const products = data.results || data;
    
    if (products.length > 0) {
      const slug = products[0].slug;
      const res = await request.get(`${API_BASE}/api/products/portal/${slug}/`); // Test portal detailed endpoint
      expect(res.status()).toBe(200);
      
      const detail = await res.json();
      expect(detail.id).toBeDefined();
      expect(detail.name).toBeDefined();

      if (detail.images && detail.images.length > 0) {
        for (const img of detail.images) {
          expect(img.is_main).toBeUndefined(); // Regression: is_main shouldn't exist
          expect(img.image_url).toBeDefined();
        }
      }
    }
  });

  test('Produto inativo não deve aparecer na listagem pública', async ({ request }) => {
    // This is hard to test deterministically without a known inactive product fixture,
    // but we can assert all returned products have is_active !== false (if exposed)
    const resProd = await request.get(`${API_BASE}/api/products/`);
    const data = await resProd.json();
    const products = data.results || data;

    for (const prod of products) {
      if (prod.hasOwnProperty('is_active')) {
        expect(prod.is_active).not.toBe(false);
      }
    }
  });
});
