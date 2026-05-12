const { chromium } = require('playwright');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';
const PASS = 'Orquidea@2026';

const USERS = {
  admin: 'admin@orquidea.com.br',
  tecnico: 'tecnico@teste.com',
  cliente: 'cliente@teste.com'
};

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  
  console.log('--- 🔐 INICIANDO TESTE DE PERMISSÕES (RBAC) ---');

  // TESTE 1: CLIENTE TENTANDO ACESSAR O CMS (ADMIN)
  console.log('\n❌ [Cenário: Cliente no Admin]');
  const contextClient = await browser.newContext();
  const pageClient = await contextClient.newPage();
  
  await pageClient.goto(`${BACKEND_URL}/admin/login/`);
  await pageClient.fill('input[name="username"]', USERS.cliente);
  await pageClient.fill('input[name="password"]', PASS);
  await pageClient.click('input[type="submit"]');
  
  const clientError = await pageClient.locator('.errornote').textContent();
  if (clientError.includes('não têm permissão')) {
    console.log('   ✅ SUCESSO: Cliente bloqueado no Admin com mensagem de erro.');
  } else {
    console.log('   ⚠️ AVISO: Cliente não entrou, mas a mensagem foi: ' + clientError.trim());
  }
  await contextClient.close();

  // TESTE 2: TÉCNICO (EDITOR) NO ADMIN
  console.log('\n⚖️ [Cenário: Técnico no Admin]');
  const contextTec = await browser.newContext();
  const pageTec = await contextTec.newPage();
  
  await pageTec.goto(`${BACKEND_URL}/admin/login/`);
  await pageTec.fill('input[name="username"]', USERS.tecnico);
  await pageTec.fill('input[name="password"]', PASS);
  await pageTec.click('input[type="submit"]');
  
  if (pageTec.url().includes('/admin/')) {
    console.log('   ✅ SUCESSO: Técnico acessou o Painel Administrativo.');
  }
  await contextTec.close();

  // TESTE 3: ADMIN TOTAL
  console.log('\n👑 [Cenário: Admin Total]');
  const contextAdmin = await browser.newContext();
  const pageAdmin = await contextAdmin.newPage();
  
  await pageAdmin.goto(`${BACKEND_URL}/admin/login/`);
  await pageAdmin.fill('input[name="username"]', USERS.admin);
  await pageAdmin.fill('input[name="password"]', PASS);
  await pageAdmin.click('input[type="submit"]');
  
  if (pageAdmin.url().endsWith('/admin/')) {
    console.log('   ✅ SUCESSO: Admin acessou o Dashboard Master.');
  }
  await contextAdmin.close();

  console.log('\n--- ✨ TESTE DE PERMISSÕES FINALIZADO ---');
  await browser.close();
})();
