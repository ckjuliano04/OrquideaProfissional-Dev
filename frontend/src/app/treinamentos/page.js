"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/services/api";
import { normalizeTrainingList } from "@/services/normalizers";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { TrainingSkeleton } from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Clock,
  MonitorPlay,
  Lock,
} from "lucide-react";
import FlourParticles from "@/components/FlourParticles";

export default function TreinamentosPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isCliente = user?.role === "CLIENTE";

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || isCliente) {
      setLoading(false);
      return;
    }

    fetchAPI("/portal/training/")
      .then((data) => {
        setMaterials(normalizeTrainingList(data));
        setError(null);
      })
      .catch((err) => {
        console.error("Erro ao carregar treinamentos:", err);
        if (err.message.includes("403")) {
          setError(
            "Você não tem permissão de nível 'Técnico' para acessar estes materiais.",
          );
        } else {
          setError("Não foi possível carregar os materiais de treinamento.");
        }
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TrainingSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || isCliente) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50 min-h-[70vh] p-4 relative overflow-hidden">
        {/* Background decors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orquidea-night/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orquidea-green/5 rounded-full blur-[100px] -ml-32 -mb-32" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-2xl relative z-10"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-400 rotate-12 shadow-inner">
            <Lock size={40} className="-rotate-12 text-slate-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase font-serif">
            Acesso Restrito
          </h2>
          <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium">
            {isCliente
              ? "Esta seção é exclusiva para nossa equipe técnica e parceiros especializados. Como cliente, você tem acesso total ao nosso catálogo de produtos e dicas de uso."
              : "Faça login para acessar os materiais exclusivos de treinamento e capacitação técnica."}
          </p>
          <Link href={isCliente ? "/catalogo" : "/login"}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-orquidea-night text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orquidea-green transition-colors shadow-xl shadow-orquidea-night/10 cursor-pointer"
            >
              {isCliente ? "Explorar Catálogo" : "Fazer Login"}
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-grow bg-slate-50 pb-32">
      {/* Header Banner - Technical Area Saturated Variation */}
      <section className="bg-orquidea-tech text-white pt-40 pb-24 relative overflow-hidden">
        <FlourParticles opacity={0.2} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64 z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md mb-8 border border-white/20 shadow-2xl text-orquidea-gold">
              <GraduationCap size={40} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 font-serif">
              Área <span className="text-orquidea-gold">Técnica</span>
            </h1>
            <p className="text-lg md:text-2xl text-orquidea-cream/80 max-w-2xl mx-auto font-medium leading-relaxed italic font-serif">
              Materiais exclusivos, vídeo-aulas e documentações técnicas para o
              desenvolvimento da excelência profissional.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8 relative z-30">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-8 rounded-[2rem] border border-red-100 text-center font-medium flex flex-col items-center gap-4 max-w-2xl mx-auto shadow-lg shadow-red-500/5"
          >
            <ShieldAlert size={32} />
            {error}
          </motion.div>
        ) : materials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] border border-slate-100 p-20 text-center shadow-2xl shadow-slate-200/50 max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
              <BookOpen size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 font-serif">
              Nenhum treinamento disponível
            </h3>
            <p className="text-slate-500 font-medium">
              No momento, não há materiais de treinamento designados para o seu
              perfil.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {materials.map((mat) => (
              <motion.div
                key={mat.id}
                variants={itemVariants}
                className="h-full"
              >
                <Link
                  href={`/treinamentos/${mat.id}`}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(21,128,61,0.12)] hover:border-orquidea-green/30 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orquidea-tech/5 rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-700" />

                  <div className="w-16 h-16 bg-orquidea-tech/10 text-orquidea-tech rounded-2xl flex items-center justify-center mb-8 group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-orquidea-tech group-hover:text-white transition-all duration-500 relative z-10 shadow-inner">
                    <MonitorPlay size={28} />
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-orquidea-tech transition-colors leading-tight font-serif relative z-10">
                    {mat.title}
                  </h3>

                  <p className="text-slate-500 mb-8 flex-grow line-clamp-3 leading-relaxed font-medium relative z-10 text-sm">
                    {mat.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
                      {mat.audience_type}
                    </span>
                    <span className="text-xs font-black text-orquidea-tech uppercase tracking-widest flex items-center gap-2 group-hover:text-orquidea-green transition-colors">
                      Acessar
                      <div className="w-6 h-6 rounded-full bg-orquidea-tech/10 flex items-center justify-center group-hover:bg-orquidea-green/20 group-hover:translate-x-1 transition-all">
                        <ArrowRight size={12} />
                      </div>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
