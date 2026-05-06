const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BASE_URL = 'https://orquideaprofissional.com.br';

export default async function sitemap() {
  // 1. Rotas Estáticas (Sempre funcionam)
  const routes = ['', '/catalogo', '/onde-comprar', '/nossa-historia'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));

  // 2. Rotas Dinâmicas (Produtos)
  let productRoutes = [];
  try {
    // Usamos fetch direto aqui para ser 100% seguro no servidor
    const res = await fetch(`${API_URL}/products/`, { 
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (res.ok) {
      const products = await res.json();
      productRoutes = products.map((product) => ({
        url: `${BASE_URL}/catalogo/${product.slug}`,
        lastModified: new Date(product.updated_at || product.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Aviso: Não foi possível buscar produtos para o sitemap:', error.message);
    // Não lançamos erro aqui para o sitemap estático continuar funcionando
  }

  return [...routes, ...productRoutes];
}
