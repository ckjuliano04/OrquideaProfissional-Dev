'use client';

import { useState, useEffect, use } from 'react';
import { fetchAPI } from '@/services/api';
import { normalizeTrainingDetail } from '@/services/normalizers';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { TrainingDetailSkeleton } from '@/components/ui/Skeleton';

export default function TreinamentoDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    fetchAPI(`/portal/training/${id}/`)
      .then(data => {
        setMaterial(normalizeTrainingDetail(data));
        setError(null);
      })
      .catch(err => {
        console.error("Erro ao carregar detalhe do treinamento:", err);
        setError("Não foi possível carregar as informações deste treinamento.");
      })
      .finally(() => setLoading(false));
  }, [id, isAuthenticated, authLoading]);

  if (loading || authLoading) {
    return <TrainingDetailSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 min-h-[60vh] p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Acesso Restrito</h2>
          <p className="text-slate-600 mb-8">Faça login para acessar este material de treinamento.</p>
          <Link href="/login" className="px-8 py-4 bg-orquidea-green text-white font-bold rounded-xl hover:bg-orquidea-dark transition-all">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 min-h-[60vh]">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ops!</h2>
          <p className="text-slate-600 mb-6">{error || "Material não encontrado."}</p>
          <Link href="/treinamentos" className="px-6 py-3 bg-orquidea-green text-white font-semibold rounded-lg hover:bg-orquidea-dark transition-colors">
            Voltar aos Treinamentos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 pb-20">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/treinamentos" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orquidea-green transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar aos Treinamentos
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orquidea-green/10 text-orquidea-green text-xs font-bold tracking-wider uppercase rounded-full">
              {material.audience_type}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {material.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mb-8">
            {material.description}
          </p>

          {/* Conteúdo Adicional */}
          {material.content && (
            <div className="bg-slate-50 border-l-4 border-orquidea-green p-6 rounded-r-2xl max-w-3xl">
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {material.content}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Lista de Vídeos */}
            {material.videos && material.videos.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Vídeo-aulas
                </h3>
                <div className="space-y-6">
                  {material.videos.map(video => (
                    <div key={video.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                      {/* Prioridade para Vídeo Nativo (Upload) */}
                      {video.video_file ? (
                        <div className="relative bg-black aspect-video">
                          <video 
                            controls 
                            className="w-full h-full"
                            poster="/logos/OrquideaProfissional_Logo_Transparente.png"
                          >
                            <source src={video.video_file} type="video/mp4" />
                            Seu navegador não suporta a reprodução de vídeos.
                          </video>
                        </div>
                      ) : video.video_url && (video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be')) ? (
                        <div className="relative pt-[56.25%] bg-slate-900">
                          <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video.video_url.split('v=')[1] || video.video_url.split('/').pop()}`}
                            title={video.title}
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : (
                        <div className="bg-slate-900 p-8 flex items-center justify-center">
                          <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Abrir Vídeo Externo
                          </a>
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-slate-900">{video.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Lista de Arquivos */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Materiais de Apoio
                </h3>
                {material.files && material.files.length > 0 ? (
                  <ul className="space-y-4">
                    {material.files.map(file => (
                      <li key={file.id}>
                        <a 
                          href={file.file_upload} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group"
                        >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orquidea-green shadow-sm group-hover:bg-orquidea-green group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{file.title}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1">Baixar Documento</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">Nenhum arquivo de apoio disponível.</p>
                )}
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
