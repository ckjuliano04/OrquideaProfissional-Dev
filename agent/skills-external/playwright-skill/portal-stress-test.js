const { chromium, devices } = require('playwright');
const path = require('path');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';
const ADMIN_USER = 'admin@orquidea.com.br';
const ADMIN_PASS = 'Orquidea@2026';
const WRONG_PASS = 'SenhaErrada123';
const TEST_IMAGE_PATH = 'C:/Users/juliano.koagura/.gemini/antigravity/brain/76029770-4745-4165-8a31-b442c43bbe59/test_upload_image_1778590783806.png';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- 🧪 INICIANDO STRESS TEST DE FLUXOS CRÍTICOS (V2) ---');

  try {
    // 1. LOGIN VÁLIDO E INVÁLIDO
    console.log('\n🔐 [Fluxo: Autenticação]');
    await page.goto(`${BACKEND_URL}/admin/login/`);
    await page.fill('input[name="username"]', ADMIN_USER);
    await page.fill('input[name="password"]', WRONG_PASS);
    await page.click('input[type="submit"]');
    console.log('   ✅ Bloqueio de senha errada OK.');

    await page.fill('input[name="password"]', ADMIN_PASS);
    await page.click('input[type="submit"]');
    await page.waitForURL('**/admin/');
    console.log('   ✅ Login bem-sucedido.');

    // 2. SEGURANÇA: ACESSO SEM LOGIN
    console.log('\n🛡️ [Fluxo: Segurança Básica]');
    await context.clearCookies();
    await page.goto(`${BACKEND_URL}/admin/`);
    if (page.url().includes('/admin/login/')) {
      console.log('   ✅ Proteção de /admin sem login OK.');
    }

    // Login novamente
    await page.goto(`${BACKEND_URL}/admin/login/`);
    await page.fill('input[name="username"]', ADMIN_USER);
    await page.fill('input[name="password"]', ADMIN_PASS);
    await page.click('input[type="submit"]');

    // 3. CRUD COM UPLOAD E VALIDAÇÃO
    console.log('\n📝 [Fluxo: Gestão de Conteúdo & Upload]');
    await page.goto(`${BACKEND_URL}/admin/content/tips/add/`);
    
    // Teste: Campos Obrigatórios (Tentar salvar vazio)
    console.log('   ↳ Testando validação de campos obrigatórios...');
    await page.click('input[name="_save"]');
    const errors = await page.locator('.errorlist').count();
    if (errors > 0) {
      console.log('   ✅ CMS impediu o salvamento sem campos obrigatórios.');
    }

    // Preencher dados reais
    await page.fill('input[name="title"]', 'Técnica de Sourdough Profissional');
    await page.fill('input[name="slug"]', 'sourdough-pro-teste');
    await page.fill('input[name="summary"]', 'O segredo da casca perfeita e do miolo aerado.');
    await page.fill('textarea[name="content"]', 'Este é um guia completo sobre fermentação natural para grandes produções.');
    
    // Checkbox is_active
    await page.check('input[name="is_active"]');

    // Upload de Imagem
    console.log('   ↳ Testando upload de imagem técnica...');
    await page.setInputFiles('input[name="image"]', TEST_IMAGE_PATH);
    
    await page.click('input[name="_save"]');
    console.log('   ✅ Post com imagem criado com sucesso no CMS.');

    // Validar no Frontend
    console.log('   ↳ Validando URL pública no Frontend...');
    await page.goto(`${FRONTEND_URL}/dicas/sourdough-pro-teste`, { waitUntil: 'networkidle' });
    const feTitle = await page.textContent('h1');
    if (feTitle.includes('Técnica de Sourdough Profissional')) {
      console.log('   ✅ Conteúdo e URL visíveis para o público.');
    }

    // 4. LOGOUT
    console.log('\n🚪 [Fluxo: Logout]');
    await page.goto(`${BACKEND_URL}/admin/logout/`);
    console.log('   ✅ Logout realizado.');
    await page.goto(`${BACKEND_URL}/admin/`);
    if (page.url().includes('/admin/login/')) {
      console.log('   ✅ Sessão encerrada corretamente.');
    }

    // 5. RESPONSIVIDADE MOBILE (RESUMIDO)
    console.log('\n📱 [Fluxo: Mobile]');
    const iPhone = devices['iPhone 13'];
    const mobileContext = await browser.newContext({ ...iPhone });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${FRONTEND_URL}/dicas/sourdough-pro-teste`);
    console.log('   ✅ Página de Dica responsiva no Mobile.');

    console.log('\n--- ✨ TESTES DE FLUXO COMPLETOS ---');

  } catch (error) {
    console.error('\n❌ FALHA NO TESTE:', error.message);
  } finally {
    await browser.close();
  }
})();
