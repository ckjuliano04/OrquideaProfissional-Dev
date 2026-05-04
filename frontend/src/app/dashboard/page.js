'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (!user) return null;

  return (
    <div className="flex-grow bg-slate-50 pb-20">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-orquidea-green/10 mix-blend-overlay z-0" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="px-3 py-1 bg-orquidea-green/20 text-orquidea-light text-xs font-bold uppercase tracking-widest rounded-full mb-4 inline-block border border-orquidea-green/30">
                Acesso Autenticado
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
                Olá, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-slate-400 text-lg">
                Bem-vindo ao portal profissional da Orquídea Alimentos.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-orquidea-green rounded-xl flex items-center justify-center font-bold text-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-slate-300 font-medium">Logado como</p>
                <p className="font-bold text-white capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hub Content */}
      <div className="container mx-auto px-4 max-w-5xl mt-[-2rem] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Área Comercial / Vendedor */}
          {['vendedor', 'interno', 'admin'].includes(user.role?.toLowerCase()) && (
            <Link href="/catalogo" className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(21,128,61,0.08)] hover:border-orquidea-green/30 transition-all flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-orquidea-green/5 transition-colors"></div>
              
              <div className="w-16 h-16 bg-orquidea-green/10 text-orquidea-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orquidea-green group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Área Vendedor</h2>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                Catálogo completo de produtos com acesso às fichas técnicas, imagens em alta resolução e argumentos de vendas para os clientes.
              </p>
              
              <div className="flex items-center text-orquidea-green font-bold group-hover:translate-x-2 transition-transform">
                Explorar Catálogo Restrito
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          )}

          {/* Card 2: Área Técnica / Treinamentos */}
          {['tecnico', 'interno', 'admin', 'profissional'].includes(user.role?.toLowerCase()) && (
            <Link href="/treinamentos" className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(21,128,61,0.08)] hover:border-orquidea-green/30 transition-all flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-orquidea-green/5 transition-colors"></div>
              
              <div className="w-16 h-16 bg-orquidea-green/10 text-orquidea-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orquidea-green group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Área Técnico</h2>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                Acesse vídeo-aulas, dicas exclusivas e manuais de panificação. O hub de capacitação e reciclagem para a linha profissional.
              </p>
              
              <div className="flex items-center text-orquidea-green font-bold group-hover:translate-x-2 transition-transform">
                Acessar Treinamentos
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          )}

          {/* Card 3: Área Cliente */}
          {['cliente'].includes(user.role?.toLowerCase()) && (
            <Link href="/catalogo" className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(21,128,61,0.08)] hover:border-orquidea-green/30 transition-all flex flex-col h-full relative overflow-hidden md:col-span-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-orquidea-green/5 transition-colors"></div>
              
              <div className="w-16 h-16 bg-orquidea-green/10 text-orquidea-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orquidea-green group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Área do Cliente</h2>
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                Bem-vindo à área do cliente. Acesse o catálogo de produtos e entre em contato com seu representante comercial para pedidos.
              </p>
              
              <div className="flex items-center text-orquidea-green font-bold group-hover:translate-x-2 transition-transform">
                Ir para o Catálogo
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          )}

        </div>
        
        {/* Logout Zone */}
        <div className="text-center mt-12">
          <button 
            onClick={logout}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-red-500 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Encerrar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}
