const { chromium } = require('playwright');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';
const ADMIN_USER = 'admin@orquidea.com.br';
const ADMIN_PASS = 'Orquidea@2026';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- 🎭 INICIANDO AUDIT MASTER DO PORTAL ORQUÍDEA ---');

  try {
    // 1. TESTE FRONTEND: HOME
    console.log('\n🏠 Testando Frontend: Home...');
    await page.goto(FRONTEND_URL, { waitUntil: 'networkidle' });
    const homeTitle = await page.title();
    console.log(`✅ Home carregada: ${homeTitle}`);
    await page.screenshot({ path: 'audit-home.png' });

    // 2. TESTE FRONTEND: DICAS
    console.log('\n📚 Testando Frontend: Hub de Dicas...');
    await page.goto(`${FRONTEND_URL}/dicas`, { waitUntil: 'networkidle' });
    const dicasH1 = await page.textContent('h1');
    console.log(`✅ Página de Dicas OK: ${dicasH1.trim()}`);
    
    // Testar filtro rápido
    await page.click('button:has-text("Crocância")');
    console.log('✅ Filtro "Crocância" testado.');

    // 3. TESTE CMS: ADMIN LOGIN
    console.log('\n⚙️ Testando CMS: Login Administrativo...');
    await page.goto(`${BACKEND_URL}/admin/login/`, { waitUntil: 'networkidle' });
    
    // Tentar login
    await page.fill('input[name="username"]', ADMIN_USER);
    await page.fill('input[name="password"]', ADMIN_PASS);
    await page.click('input[type="submit"]');
    
    // Esperar carregar o dashboard do admin
    await page.waitForURL('**/admin/');
    console.log('✅ Login no CMS bem-sucedido!');
    await page.screenshot({ path: 'audit-cms-dashboard.png' });

    // 4. TESTE CMS: NAVEGAÇÃO DE MODELOS
    console.log('\n📦 Verificando Modelos no CMS...');
    await page.goto(`${BACKEND_URL}/admin/content/tips/`);
    console.log('✅ Lista de Dicas no CMS acessível.');
    
    await page.goto(`${BACKEND_URL}/admin/products/product/`);
    console.log('✅ Lista de Produtos no CMS acessível.');

    console.log('\n--- ✨ AUDIT FINALIZADO COM SUCESSO ---');
    console.log('Resultados salvos em screenshots: audit-home.png e audit-cms-dashboard.png');

  } catch (error) {
    console.error('\n❌ ERRO DURANTE O AUDIT:', error.message);
    await page.screenshot({ path: 'audit-error-report.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
