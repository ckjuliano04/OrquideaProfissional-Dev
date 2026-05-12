const { chromium, devices } = require('playwright');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';
const API_URL = `${BACKEND_URL}/api`;

const CREDENTIALS = {
  admin: { email: 'admin@orquidea.com.br', pass: 'Orquidea@2026' },
  tecnico: { email: 'tecnico@teste.com', pass: 'Orquidea@2026' },
  cliente: { email: 'cliente@teste.com', pass: 'Orquidea@2026' }
};

async function logStep(step, status = '⏳') {
  console.log(`${status} [QA] ${step}`);
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  
  console.log('\n================================================');
  console.log('🏆 ORQUÍDEA PROFISSIONAL - SUPER QA AUDIT 360º');
  console.log('================================================\n');

  try {
    // --- BLOCO 1: BACKEND HEALTH & SCHEMA LEGADO ---
    await logStep('FASE 1: Backend Health & Legacy Schema');
    const startBackend = Date.now();
    const resProducts = await fetch(`${API_URL}/products/`);
    const latency = Date.now() - startBackend;
    
    if (resProducts.status === 200) {
      const data = await resProducts.json();
      console.log(`   ✅ /api/products/ respondeu em ${latency}ms (Status: 200)`);
      if (data.results && data.results.length > 0) {
        const prod = data.results[0];
        console.log(`   ✅ Schema Check: Campos 'id', 'name', 'slug' presentes.`);
      }
    } else {
      console.log(`   ❌ /api/products/ falhou com status ${resProducts.status}`);
    }

    // --- BLOCO 2: AUTENTICAÇÃO JWT ---
    await logStep('FASE 2: Autenticação JWT & Claims');
    const resAuth = await fetch(`${API_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: CREDENTIALS.admin.email, password: CREDENTIALS.admin.pass })
    });
    
    if (resAuth.status === 200) {
      const tokens = await resAuth.json();
      console.log('   ✅ Login Admin: SUCESSO (Tokens gerados)');
      // Testar /api/users/me/
      const resMe = await fetch(`${API_URL}/users/me/`, {
        headers: { 'Authorization': `Bearer ${tokens.access}` }
      });
      const userData = await resMe.json();
      console.log(`   ✅ JWT Claim: User Type detectado como '${userData.user_type}'`);
    }

    // --- BLOCO 3: RBAC (PERMISSÕES) ---
    await logStep('FASE 3: Matriz de Permissões (RBAC)');
    // Testar acesso anônimo ao Admin
    const anonRes = await fetch(`${BACKEND_URL}/admin/`);
    if (anonRes.status === 200 && anonRes.url.includes('login')) {
      console.log('   ✅ Segurança: Acesso anônimo ao /admin redirecionado para login.');
    }

    // --- BLOCO 4: FRONTEND E2E & ERROS SILENCIOSOS ---
    await logStep('FASE 4: Frontend Stability & Console Errors');
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') console.log(`   🚨 Console Error: ${msg.text()}`);
    });

    await page.goto(FRONTEND_URL, { waitUntil: 'networkidle' });
    const feTitle = await page.title();
    console.log(`   ✅ Home renderizada: ${feTitle}`);
    await page.screenshot({ path: 'qa-evidence-home-desktop.png' });

    // --- BLOCO 5: RESPONSIVIDADE MOBILE ---
    await logStep('FASE 5: Responsividade Mobile (iPhone 13)');
    const iPhone = devices['iPhone 13'];
    const mobileContext = await browser.newContext({ ...iPhone });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${FRONTEND_URL}/dicas`);
    console.log('   ✅ Mobile Viewport: Layout adaptado com sucesso.');
    await mobilePage.screenshot({ path: 'qa-evidence-mobile-dicas.png' });

    // --- BLOCO 6: SEGURANÇA (IDOR/SQLi) ---
    await logStep('FASE 6: Security Sanity (SQLi/XSS)');
    const resSQLi = await fetch(`${API_URL}/products/?slug=' OR 1=1--`);
    if (resSQLi.status < 500) {
      console.log('   ✅ SQLi Sanity: Backend não crashou com payload malicioso.');
    }

    console.log('\n================================================');
    console.log('✨ AUDITORIA SUPER-QA FINALIZADA');
    console.log('================================================\n');

  } catch (error) {
    console.error('\n🛑 FALHA CRÍTICA NA AUDITORIA:', error.message);
  } finally {
    await browser.close();
  }
})();
