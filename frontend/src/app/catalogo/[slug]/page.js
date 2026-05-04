'use client';

import { useState, useEffect, use } from 'react';
import { fetchAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return; // Espera o carregamento inicial da sessão

    // Bloqueio de segurança: se não estiver logado, manda para o login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Define qual endpoint chamar: portal (logado) ou público (anônimo)
    // Atualmente configurado para priorizar o portal já que o acesso é restrito.
    const endpoint = isAuthenticated 
      ? `/products/portal/${slug}/` 
      : `/products/${slug}/`;

    fetchAPI(endpoint)
      .then(data => {
        setProduct(data);
        setError(null);
      })
      .catch(err => {
        console.error("Erro ao carregar produto:", err);
        setError("Não foi possível carregar os detalhes do produto.");
      })
      .finally(() => setLoading(false));
  }, [slug, isAuthenticated, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orquidea-green border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Carregando informações...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 min-h-[60vh]">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ops!</h2>
          <p className="text-slate-600 mb-6">{error || "Produto não encontrado."}</p>
          <Link href="/catalogo" className="px-6 py-3 bg-orquidea-green text-white font-semibold rounded-lg hover:bg-orquidea-dark transition-colors">
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 flex items-center text-sm font-medium text-slate-500">
          <Link href="/catalogo" className="hover:text-orquidea-green transition-colors">Catálogo</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.category_name}</span>
          <span className="mx-2">/</span>
          <span className="text-slate-900 truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Top Section: Image & Basic Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row mb-8">
          
          {/* Imagem Principal */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-200">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="max-w-full max-h-[400px] object-contain drop-shadow-xl" />
            ) : (
              <div className="w-full h-64 bg-slate-100 rounded-2xl flex items-center justify-center">
                <span className="text-slate-400 font-medium">Imagem não disponível</span>
              </div>
            )}
          </div>

          {/* Info Secundária */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-orquidea-green/10 text-orquidea-green text-xs font-bold tracking-wider uppercase rounded-full mb-4 self-start">
              {product.category_name}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-sm font-mono text-slate-500 mb-6 bg-slate-100 inline-block px-3 py-1 rounded-lg self-start">
                SKU: {product.sku}
              </p>
            )}
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {product.short_description}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.weight_info && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Peso</span>
                  <span className="text-sm font-semibold text-slate-800">{product.weight_info}</span>
                </div>
              )}
              {product.shelf_life_info && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Validade</span>
                  <span className="text-sm font-semibold text-slate-800">{product.shelf_life_info}</span>
                </div>
              )}
            </div>

            {!isAuthenticated && (
              <div className="mt-auto bg-slate-900 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg shadow-slate-900/20">
                <div>
                  <h4 className="font-bold mb-1">Conteúdo Exclusivo</h4>
                  <p className="text-slate-400 text-sm">Faça login para acessar fichas técnicas e manuais.</p>
                </div>
                <Link href="/login" className="px-5 py-2.5 bg-orquidea-green hover:bg-orquidea-light text-white font-bold rounded-xl transition-colors whitespace-nowrap ml-4 shadow-md">
                  Fazer Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Informações Detalhadas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição Completa */}
            {product.full_description && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orquidea-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Descrição Detalhada
                </h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {product.full_description}
                </div>
              </section>
            )}

            {/* Dicas de Uso e Aplicação */}
            {(product.usage_tips || product.application_text) && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orquidea-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Dicas e Aplicações
                </h3>
                
                <div className="space-y-6">
                  {product.usage_tips && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Dicas de Uso</h4>
                      <div className="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                        {product.usage_tips}
                      </div>
                    </div>
                  )}
                  {product.application_text && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Aplicações</h4>
                      <div className="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                        {product.application_text}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
            
            {/* Informação Técnica Aberta */}
            {product.technical_info && (
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orquidea-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Informações Técnicas Básicas
                </h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {product.technical_info}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - Conteúdo Restrito */}
          <div>
            <div className="sticky top-24 space-y-6">
              
              {/* Arquivos (PDFs) */}
              {product.files && product.files.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </h3>
                  <ul className="space-y-3">
                    {product.files.map(file => (
                      <li key={file.id}>
                        <a href={file.external_url || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-orquidea-green shadow-sm group-hover:bg-orquidea-green group-hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{file.title}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">{file.file_type || 'Documento'}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dicas Restritas (Role Contents) */}
              {isAuthenticated && product.role_contents && product.role_contents.length > 0 && (
                <div className="bg-gradient-to-br from-orquidea-dark to-slate-900 p-6 rounded-2xl shadow-lg border border-orquidea-green/30 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-secondary-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="font-bold text-lg">Conteúdo Exclusivo</h3>
                  </div>
                  <div className="space-y-4">
                    {product.role_contents.map((rc, idx) => (
                      <div key={idx} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        {rc.title && <h4 className="font-semibold mb-2 text-orquidea-light">{rc.title}</h4>}
                        <div className="text-sm text-slate-200 whitespace-pre-wrap">
                          {rc.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
