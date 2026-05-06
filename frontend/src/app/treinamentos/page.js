'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/services/api';
import { normalizeTrainingList } from '@/services/normalizers';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { TrainingSkeleton } from '@/components/ui/Skeleton';

export default function TreinamentosPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    fetchAPI('/portal/training/')
      .then(data => {
        setMaterials(normalizeTrainingList(data));
        setError(null);
      })
      .catch(err => {
        console.error("Erro ao carregar treinamentos:", err);
        setError("Não foi possível carregar os materiais de treinamento.");
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex-grow bg-slate-50 pb-20">
        <div className="bg-orquidea-tech text-white py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 animate-pulse">
            <div className="h-12 w-64 bg-white/10 rounded-xl mb-4" />
            <div className="h-6 w-96 bg-white/10 rounded-lg" />
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <TrainingSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 min-h-[60vh] p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-lg">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Acesso Restrito</h2>
          <p className="text-slate-600 mb-8">Faça login para acessar os materiais exclusivos de treinamento e capacitação técnica.</p>
          <Link href="/login" className="px-8 py-4 bg-orquidea-green text-white font-bold rounded-xl hover:bg-orquidea-dark transition-all shadow-md shadow-orquidea-green/20">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 pb-20">
      {/* Header Banner - Technical Area Saturated Variation */}
      <div className="bg-orquidea-tech text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Área <span className="text-orquidea-cream">Técnica</span>
          </h1>
          <p className="text-lg text-orquidea-cream/70 max-w-2xl font-medium">
            Materiais exclusivos, vídeo-aulas e documentações técnicas para o desenvolvimento da excelência profissional.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-medium">
            {error}
          </div>
        ) : materials.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum treinamento disponível</h3>
            <p className="text-slate-500">No momento, não há materiais de treinamento designados para o seu perfil.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map(mat => (
              <Link 
                href={`/treinamentos/${mat.id}`}
                key={mat.id}
                className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(21,128,61,0.08)] hover:border-orquidea-green/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 bg-orquidea-green/10 text-orquidea-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orquidea-green group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orquidea-green transition-colors line-clamp-2">
                  {mat.title}
                </h3>
                
                <p className="text-slate-500 mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {mat.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {mat.audience_type}
                  </span>
                  <span className="text-sm font-semibold text-orquidea-green flex items-center gap-1">
                    Acessar Material
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
