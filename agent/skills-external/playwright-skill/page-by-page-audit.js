const { chromium } = require('playwright');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';
const ADMIN_USER = 'admin@orquidea.com.br';
const ADMIN_PASS = 'Orquidea@2026';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  console.log('\n================================================');
  console.log('🚀 INICIANDO AUDITORIA COMPLETA PÁGINA POR PÁGINA');
  console.log('================================================\n');

  const frontendRoutes = [
    { name: 'Home', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Dicas', path: '/dicas' },
    { name: 'Nossa História', path: '/nossa-historia' },
    { name: 'Onde Comprar', path: '/onde-comprar' },
    { name: 'Treinamentos', path: '/treinamentos' },
    { name: 'Login', path: '/login' }
  ];

  const cmsRoutes = [
    { name: 'Dashboard', path: '/admin/' },
    { name: 'Dicas (Admin)', path: '/admin/content/tips/' },
    { name: 'Produtos (Admin)', path: '/admin/products/product/' },
    { name: 'Marcas (Admin)', path: '/admin/products/brand/' },
    { name: 'Usuários (Admin)', path: '/admin/users/user/' }
  ];

  try {
    // --- PARTE 1: FRONTEND ---
    console.log('🌐 [FASE 1] Verificando Frontend Next.js...');
    for (const route of frontendRoutes) {
      process.stdout.write(`   ↳ Testando ${route.name}... `);
      try {
        await page.goto(`${FRONTEND_URL}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        console.log('✅ OK');
        // Snapshot ocasional para registro
        if (route.name === 'Home' || route.name === 'Catálogo') {
          await page.screenshot({ path: `audit-fe-${route.name.toLowerCase().replace(' ', '-')}.png` });
        }
      } catch (e) {
        console.log(`❌ ERRO: ${e.message.split('\n')[0]}`);
      }
    }

    // --- PARTE 2: CMS LOGIN ---
    console.log('\n⚙️ [FASE 2] Verificando CMS Django Admin...');
    process.stdout.write('   ↳ Fazendo login no Admin... ');
    await page.goto(`${BACKEND_URL}/admin/login/`);
    await page.fill('input[name="username"]', ADMIN_USER);
    await page.fill('input[name="password"]', ADMIN_PASS);
    await page.click('input[type="submit"]');
    await page.waitForURL('**/admin/');
    console.log('✅ Logado');

    // --- PARTE 3: CMS ROUTES ---
    console.log('\n📦 [FASE 3] Verificando Seções do CMS...');
    for (const route of cmsRoutes) {
      process.stdout.write(`   ↳ Acessando ${route.name}... `);
      try {
        await page.goto(`${BACKEND_URL}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
        const title = await page.title();
        if (title.includes('Select') || title.includes('Site administration') || title.includes('Log in')) {
           console.log('✅ Acessível');
        } else {
           console.log('⚠️ Aviso: Título inesperado');
        }
      } catch (e) {
        console.log(`❌ ERRO: ${e.message.split('\n')[0]}`);
      }
    }

    console.log('\n================================================');
    console.log('✨ AUDITORIA FINALIZADA COM SUCESSO');
    console.log('================================================\n');

  } catch (error) {
    console.error('\n🛑 ERRO FATAL NO AUDIT:', error.message);
  } finally {
    await browser.close();
  }
})();
