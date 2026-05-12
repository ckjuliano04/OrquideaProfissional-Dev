const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  try {
    console.log('🚀 Navegando para a página de Dicas...');
    await page.goto(`${TARGET_URL}/dicas`, { waitUntil: 'networkidle' });

    // 1. Verificar Título Editorial
    const title = await page.textContent('h1');
    console.log('✅ Título encontrado:', title.trim());

    // 2. Testar Filtros Rápidos
    console.log('🧪 Testando filtro de "Fermentação"...');
    await page.click('button:has-text("Fermentação")');
    
    // Pequena espera para o estado atualizar
    await page.waitForTimeout(500);
    
    const searchValue = await page.inputValue('input[placeholder="O que você deseja aprender hoje?"]');
    if (searchValue === 'Fermentação') {
      console.log('✅ Filtro de Fermentação aplicado com sucesso!');
    } else {
      console.log('❌ Falha ao aplicar filtro. Valor atual:', searchValue);
    }

    // 3. Verificar se há cards (esperamos que o filtro mostre algo ou o estado vazio)
    const cardsCount = await page.locator('a[href^="/dicas/"]').count();
    console.log(`ℹ️ Encontrados ${cardsCount} cards de dicas após filtro.`);

    // 4. Testar limpeza de busca
    console.log('🧪 Testando limpeza de busca...');
    await page.fill('input[placeholder="O que você deseja aprender hoje?"]', '');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // 5. Testar navegação para detalhe
    const totalCards = await page.locator('a[href^="/dicas/"]').count();
    if (totalCards > 0) {
      console.log(`🧪 Testando navegação para o detalhe da primeira dica (de ${totalCards} totais)...`);
      await page.click('a[href^="/dicas/"] >> nth=0');
      await page.waitForURL(/.*\/dicas\/.+/);
      console.log('✅ Navegação bem-sucedida para:', page.url());
      
      const detailTitle = await page.textContent('h1');
      console.log('✅ Título da dica detalhada:', detailTitle.trim());
      
      // 6. Testar botão de voltar
      console.log('🧪 Testando botão de voltar para o índice...');
      await page.click('a:has-text("Índice Profissional")');
      await page.waitForURL(/\/dicas$/);
      console.log('✅ Voltou para o índice com sucesso.');
    }

    await page.screenshot({ path: 'test-dicas-success.png', fullPage: true });
    console.log('📸 Screenshot de sucesso salvo.');

  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    await page.screenshot({ path: 'test-dicas-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
