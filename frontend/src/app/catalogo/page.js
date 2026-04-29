'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/services/api';
import Link from 'next/link';

export default function CatalogoPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca categorias e produtos em paralelo da API Pública
    Promise.all([
      fetchAPI('/products/categories/'),
      fetchAPI('/products/')
    ])
      .then(([catsData, prodsData]) => {
        setCategories(catsData);
        setProducts(prodsData);
      })
      .catch(err => console.error("Erro ao carregar catálogo:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filtra produtos localmente baseado na categoria selecionada
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category_name === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Premium do Catálogo */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
              ORQUÍDEA<span className="text-orquidea-green">PRO</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <span className="text-sm font-semibold text-slate-500 hidden md:block uppercase tracking-widest">Catálogo Aberto</span>
          </div>
          <Link href="/login" className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors shadow-md">
            Portal Restrito
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Sidebar de Filtros */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-28">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Linhas de Produto</h3>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => setActiveCategory('Todos')}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeCategory === 'Todos' ? 'bg-orquidea-green/10 text-orquidea-green' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                Todas as Linhas
              </button>
              
              {loading ? (
                // Skeleton para categorias
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-10 w-full bg-slate-100 rounded-lg animate-pulse my-1"></div>
                ))
              ) : (
                categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeCategory === cat.name ? 'bg-orquidea-green/10 text-orquidea-green' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Grid de Produtos */}
        <main className="flex-grow">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                {activeCategory}
              </h2>
              <p className="text-slate-500 font-medium">
                {loading ? 'Carregando produtos...' : `Exibindo ${filteredProducts.length} produtos`}
              </p>
            </div>
          </div>

          {loading ? (
            // Skeleton do Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white h-72 rounded-2xl border border-slate-100 shadow-sm animate-pulse flex flex-col p-6">
                  <div className="w-full h-32 bg-slate-100 rounded-xl mb-4"></div>
                  <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(21,128,61,0.08)] transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Área da Imagem (Placeholder sofisticado se não tiver imagem) */}
                  <div className="h-48 bg-slate-50/50 flex items-center justify-center border-b border-slate-100 relative overflow-hidden p-6">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center">
                        <span className="text-slate-300 font-medium text-sm">Imagem não disponível</span>
                      </div>
                    )}
                    {product.is_featured && (
                      <div className="absolute top-4 right-4 bg-secondary-yellow text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Destaque
                      </div>
                    )}
                  </div>
                  
                  {/* Dados do Produto */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-orquidea-green tracking-wider uppercase mb-2">
                      {product.category_name}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow">
                      {product.short_description || 'Produto técnico voltado para profissionais do setor alimentício.'}
                    </p>
                    
                    <button className="w-full py-3 bg-slate-50 hover:bg-orquidea-green hover:text-white text-slate-700 font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                      Ver Ficha Técnica
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <div className="text-slate-300 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhum produto encontrado</h3>
              <p className="text-slate-500 text-sm">Não há produtos cadastrados nesta categoria atualmente.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
