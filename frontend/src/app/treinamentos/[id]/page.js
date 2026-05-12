"use client";

import { useState, useEffect, use } from "react";
import { fetchAPI } from "@/services/api";
import { normalizeTrainingDetail } from "@/services/normalizers";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { TrainingDetailSkeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Download,
  FileText,
  ArrowLeft,
  Video,
  ExternalLink,
  Lock,
} from "lucide-react";

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
      .then((data) => {
        setMaterial(normalizeTrainingDetail(data));
        setError(null);
      })
      .catch((err) => {
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
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Acesso Restrito
          </h2>
          <p className="text-slate-600 mb-8">
            Faça login para acessar este material de treinamento.
          </p>
          <Link
            href="/login"
            className="px-8 py-4 bg-orquidea-green text-white font-bold rounded-xl hover:bg-orquidea-dark transition-all"
          >
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
          <p className="text-slate-600 mb-6">
            {error || "Material não encontrado."}
          </p>
          <Link
            href="/treinamentos"
            className="px-6 py-3 bg-orquidea-green text-white font-semibold rounded-lg hover:bg-orquidea-dark transition-colors"
          >
            Voltar aos Treinamentos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-50 pb-32">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-100 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orquidea-tech/5 rounded-full blur-[100px] -mr-64 -mt-64 z-0 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <Link href="/treinamentos">
            <motion.div
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-orquidea-tech transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft size={16} />
              Voltar aos Treinamentos
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-orquidea-tech text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-lg shadow-md shadow-orquidea-tech/20">
                {material.audience_type}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] font-serif tracking-tight">
              {material.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl mb-12 font-medium">
              {material.description}
            </p>

            {/* Conteúdo Adicional */}
            {material.content && (
              <div className="bg-slate-50/50 border-l-4 border-orquidea-tech p-8 rounded-r-[2rem] max-w-4xl shadow-inner">
                <div className="text-slate-600 leading-loose text-lg font-medium whitespace-pre-wrap">
                  {material.content}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-5xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Lista de Vídeos */}
            {material.videos && material.videos.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4 font-serif tracking-tight">
                  <div className="w-12 h-12 bg-orquidea-tech/10 text-orquidea-tech rounded-2xl flex items-center justify-center">
                    <Video size={24} />
                  </div>
                  Vídeo-aulas
                </h3>
                <div className="space-y-10">
                  {material.videos.map((video, index) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      key={video.id}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group"
                    >
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
                      ) : video.video_url &&
                        (video.video_url.includes("youtube.com") ||
                          video.video_url.includes("youtu.be")) ? (
                        <div className="relative pt-[56.25%] bg-slate-900 overflow-hidden">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video.video_url.split("v=")[1] || video.video_url.split("/").pop()}`}
                            title={video.title}
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : (
                        <div className="bg-slate-900 p-16 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-orquidea-tech/20 mix-blend-overlay" />
                          <a
                            href={video.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-md transition-colors flex items-center gap-3 border border-white/20 shadow-2xl"
                            >
                              <ExternalLink size={20} />
                              <span className="font-black uppercase tracking-widest text-xs">
                                Abrir Plataforma Externa
                              </span>
                            </motion.div>
                          </a>
                        </div>
                      )}
                      <div className="p-8 md:p-10 bg-white relative">
                        <div className="absolute -top-6 right-10 w-12 h-12 bg-orquidea-tech text-white rounded-full flex items-center justify-center shadow-lg shadow-orquidea-tech/30 transform group-hover:-translate-y-2 transition-transform duration-500">
                          <PlayCircle size={24} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 font-serif">
                          {video.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-32"
            >
              {/* Lista de Arquivos */}
              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 font-serif">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  Materiais de Apoio
                </h3>
                {material.files && material.files.length > 0 ? (
                  <ul className="space-y-4">
                    {material.files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={file.file_upload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 hover:bg-orquidea-tech/5 transition-all border border-slate-100 hover:border-orquidea-tech/20 group"
                        >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orquidea-tech shadow-sm group-hover:scale-110 group-hover:bg-orquidea-tech group-hover:text-white transition-all duration-300">
                            <Download size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate group-hover:text-orquidea-tech transition-colors">
                              {file.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 group-hover:text-orquidea-tech/60 transition-colors">
                              Baixar PDF
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                    <FileText
                      size={24}
                      className="mx-auto text-slate-300 mb-3"
                    />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Nenhum anexo
                    </p>
                  </div>
                )}
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
