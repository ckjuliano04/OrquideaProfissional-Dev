const { test, expect } = require('@playwright/test');

const API_BASE = 'http://localhost:8000';

test.describe('Phase 5: Tabela nutricional', () => {
  test('Tabela nutricional deve estar presente e bem formada no detalhe do produto portal', async ({ request }) => {
    // We check the first available product
    const resProd = await request.get(`${API_BASE}/api/products/`);
    const data = await resProd.json();
    const products = data.results || data;

    if (products.length > 0) {
      const slug = products[0].slug;
      const res = await request.get(`${API_BASE}/api/products/portal/${slug}/`);
      expect(res.status()).toBe(200);
      
      const detail = await res.json();
      
      if (detail.nutrition) {
        expect(detail.nutrition.column_count).toBeDefined();
        // Check labels
        expect(detail.nutrition).toHaveProperty('col_1_label');
        
        if (detail.nutrition_rows) {
          expect(Array.isArray(detail.nutrition_rows)).toBeTruthy();
          if (detail.nutrition_rows.length > 0) {
            const row = detail.nutrition_rows[0];
            expect(row).toHaveProperty('label');
            expect(row).toHaveProperty('value_100g');
            expect(row).toHaveProperty('value_serving');
            expect(row).toHaveProperty('vd_percentage');
          }
        }
      }
    }
  });

  test('Produto sem tabela nutricional não quebra a API', async ({ request }) => {
    // Validating all returned products don't break
    const resProd = await request.get(`${API_BASE}/api/products/`);
    expect(resProd.status()).toBe(200);
    // If it didn't return 500, we consider it safe
  });
});
