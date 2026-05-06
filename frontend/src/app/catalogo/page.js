'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/services/api';
import { normalizeProductList, normalizeCategories } from '@/services/normalizers';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ProductSkeleton } from '@/components/ui/Skeleton';

export default function CatalogoPage() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({ id: 'all', type: 'all', name: 'Todos' });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchAPI('/products/categories/'),
      fetchAPI('/products/')
    ])
      .then(([catsData, prodsData]) => {
        setCategories(normalizeCategories(catsData));
        setProducts(normalizeProductList(prodsData));
      })
      .catch(err => console.error("Erro ao carregar catálogo:", err))
      .finally(() => setLoading(false));
  }, []);

  // Organiza categorias em Divisões e Subcategorias com ordenação alfabética
  const mainDivisions = categories
    .filter(c => !c.parent)
    .sort((a, b) => a.name.localeCompare(b.name));
    
  const subcategories = categories
    .filter(c => c.parent)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filtra produtos localmente com ordenação alfabética
  const filteredProducts = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.short_description && p.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (activeCategory.type === 'all') return matchSearch;
      
      if (activeCategory.type === 'division') {
        const childCatIds = subcategories.filter(s => s.parent === activeCategory.id).map(s => s.id);
        return (childCatIds.includes(p.category) || p.category === activeCategory.id) && matchSearch;
      }
      
      if (activeCategory.type === 'subcategory') {
        return p.category === activeCategory.id && matchSearch;
      }
      
      return matchSearch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar de Filtros Hierárquico */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-28">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Nossas Linhas</h3>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setActiveCategory({ id: 'all', type: 'all', name: 'Todos' })}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeCategory.type === 'all' ? 'bg-orquidea-green text-white shadow-lg shadow-orquidea-green/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Todos os Produtos
              </button>

              {mainDivisions.map(division => (
                <div key={division.id} className="space-y-1">
                  <button 
                    onClick={() => setActiveCategory({ id: division.id, type: 'division', name: division.name })}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-black transition-all border-l-4 ${activeCategory.id === division.id ? 'bg-orquidea-cream text-orquidea-green border-orquidea-green' : 'text-slate-800 border-transparent hover:bg-slate-50'}`}
                  >
                    {division.name}
                  </button>
                  
                  {/* Subcategorias da Divisão */}
                  <div className="pl-4 flex flex-col gap-1">
                    {subcategories.filter(sub => sub.parent === division.id).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => setActiveCategory({ id: sub.id, type: 'subcategory', name: sub.name })}
                        className={`text-left px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${activeCategory.id === sub.id ? 'text-orquidea-green bg-orquidea-green/5' : 'text-slate-500 hover:text-orquidea-green hover:bg-slate-50'}`}
                      >
                        • {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid de Produtos */}
        <main className="flex-grow">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                <span>Catálogo</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={3} /></svg>
                <span className="text-orquidea-green">{activeCategory.name}</span>
              </nav>
              <h2 className="text-3xl font-black text-slate-900 leading-none">
                {activeCategory.name}
              </h2>
            </div>
            
            <div className="w-full md:w-80 relative">
              <input 
                type="text" 
                placeholder="O que você procura?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orquidea-green shadow-sm text-sm"
              />
              <svg className="w-6 h-6 text-slate-300 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[3rem] border border-slate-100 p-20 text-center shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum produto aqui</h3>
              <p className="text-slate-500">Tente outra categoria ou mude sua busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="group bg-orquidea-cream/30 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
                >
                  <div className="h-56 bg-orquidea-cream flex items-center justify-center relative p-8">
                    {product.image_url ? (
                      <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={products.indexOf(product) < 3}
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="text-slate-300 font-bold text-xs uppercase tracking-widest">Sem imagem</div>
                    )}
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow bg-white">
                    <span className="text-[10px] font-black text-orquidea-green tracking-[0.2em] uppercase mb-3">
                      {product.category_name}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-8 flex-grow leading-relaxed">
                      {product.short_description || 'Produto de alta performance para o setor profissional.'}
                    </p>
                    
                    {isAuthenticated && (
                      <Link 
                        href={`/catalogo/${product.slug}`}
                        className="w-full py-4 bg-orquidea-green hover:bg-orquidea-night text-white font-black rounded-2xl transition-all shadow-lg shadow-orquidea-green/20 text-sm flex items-center justify-center gap-2"
                      >
                        Ver Ficha Técnica
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
