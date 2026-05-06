'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Skeleton from '@/components/ui/Skeleton';

const DetailSkeleton = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-1/2 aspect-square"><Skeleton className="w-full h-full rounded-[3rem]" /></div>
      <div className="w-full lg:w-1/2 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </div>
    </div>
  </div>
);

export default function ProductDetailClient({ product, slug }) {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) return <DetailSkeleton />;
  if (!product) return null;

  return (
    <div className="flex-grow bg-slate-50 pb-20 relative">
      {/* Botão Admin */}
      {isAdmin && (
        <div className="fixed bottom-8 left-8 z-[100]">
          <a href={`http://localhost:8000/admin/products/products/${product.id}/change/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full shadow-2xl border border-white/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Editar no CMS
          </a>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-4 mb-8">
        <div className="container mx-auto px-4 flex items-center text-sm font-medium text-slate-500">
          <button onClick={() => router.push('/catalogo')} className="hover:text-orquidea-green">Catálogo</button>
          <span className="mx-3 text-slate-300">/</span>
          <span className="text-slate-900 truncate">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Lado Esquerdo: Imagem */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 text-center">
            <div className="bg-slate-200 rounded-[3rem] p-8 flex items-center justify-center aspect-square shadow-inner overflow-hidden">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={product.image_url || '/images/placeholder_product.png'} 
                alt={product.name}
                className="max-h-[85%] w-auto object-contain drop-shadow-2xl"
              />
            </div>
            
            <button className="mt-10 w-full max-w-sm py-5 bg-orquidea-gold text-white font-black rounded-full flex items-center justify-center gap-6 shadow-2xl uppercase tracking-widest text-lg mx-auto">
              Onde Comprar
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">→</span>
            </button>
          </div>

          {/* Lado Direito: Informações */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <span className="inline-block px-4 py-2 bg-orquidea-green/10 text-orquidea-green text-xs font-black tracking-[0.2em] uppercase rounded-full mb-6">
                {product.category_name}
              </span>
              <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight">{product.name}</h1>
              <p className="text-xl text-slate-500 leading-relaxed">{product.short_description}</p>
            </div>

            {/* Dados de Logística */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Peso Líquido</span>
                <span className="text-xl font-black text-slate-900">{product.weight_info || '-'}</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Validade</span>
                <span className="text-xl font-black text-slate-900">{product.shelf_life_info || '-'}</span>
              </div>
            </div>

            {/* Tabela Nutricional */}
            {product.nutrition_rows && product.nutrition_rows.length > 0 ? (
              <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl">
                <div className="bg-orquidea-green text-white py-6 px-8 text-center">
                  <h2 className="text-xl font-black uppercase tracking-widest">Informação Nutricional</h2>
                </div>
                
                {product.nutrition && (
                  <div className="p-6 bg-slate-50 border-b border-slate-100">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-tighter">Porções por embalagem: <span className="text-slate-900">{product.nutrition.portions_per_package}</span></p>
                    <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-tighter">Porção: <span className="text-slate-900">{product.nutrition.serving_size} ({product.nutrition.household_measure})</span></p>
                  </div>
                )}

                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-orquidea-cream/20 text-[10px] font-black uppercase tracking-widest text-orquidea-green/60">
                      <th className="px-8 py-5">Item</th>
                      {/* Coluna 1 */}
                      {product.nutrition?.column_count >= 1 && (
                        <th className="px-4 py-5 text-center">{product.nutrition.col_1_label}</th>
                      )}
                      {/* Coluna 2 */}
                      {product.nutrition?.column_count >= 2 && (
                        <th className="px-4 py-5 text-center">{product.nutrition.col_2_label}</th>
                      )}
                      {/* Coluna 3 */}
                      {product.nutrition?.column_count >= 3 && (
                        <th className="px-4 py-5 text-center">{product.nutrition.col_3_label}</th>
                      )}
                      {/* Coluna 4 */}
                      {product.nutrition?.column_count >= 4 && (
                        <th className="px-4 py-5 text-center">{product.nutrition.col_4_label}</th>
                      )}
                      {/* Coluna 5 */}
                      {product.nutrition?.column_count >= 5 && (
                        <th className="px-4 py-5 text-center">{product.nutrition.col_5_label}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {product.nutrition_rows.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                        <td className="px-8 py-4 text-slate-800 font-bold">{row.label}</td>
                        
                        {product.nutrition?.column_count >= 1 && (
                          <td className="px-4 py-4 text-center text-slate-500">{row.value_100g || '-'}</td>
                        )}
                        
                        {product.nutrition?.column_count >= 2 && (
                          <td className="px-4 py-4 text-center text-slate-900 font-bold">{row.value_serving || '-'}</td>
                        )}
                        
                        {product.nutrition?.column_count >= 3 && (
                          <td className="px-4 py-4 text-center text-orquidea-green font-black">{row.vd_percentage || '-'}</td>
                        )}

                        {product.nutrition?.column_count >= 4 && (
                          <td className="px-4 py-4 text-center text-slate-500">{row.value_4 || '-'}</td>
                        )}

                        {product.nutrition?.column_count >= 5 && (
                          <td className="px-4 py-4 text-center text-slate-500">{row.value_5 || '-'}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Nota de Rodapé */}
                {product.nutrition?.footer_note && (
                  <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100">
                    <p className="text-[11px] leading-relaxed text-slate-400 italic">
                      {product.nutrition.footer_note}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-16 bg-white border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center">
                <span className="text-5xl mb-6">📊</span>
                <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Dados Nutricionais em Processamento</p>
              </div>
            )}
            
            {product.full_description && (
              <div className="mt-16 pt-16 border-t border-slate-200">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Descrição Técnica</h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-line">{product.full_description}</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
