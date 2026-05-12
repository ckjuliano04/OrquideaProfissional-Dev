'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Clock, ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import FlourParticles from '@/components/FlourParticles';

export default function TipDetailClient({ tip }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!tip) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h2 className="text-5xl font-black text-orquidea-night mb-6 font-serif">Conteúdo não encontrado</h2>
        <Link href="/dicas" className="inline-flex items-center gap-3 text-orquidea-green font-black uppercase tracking-widest text-xs hover:gap-5 transition-all">
          <ChevronLeft size={20} />
          Voltar para a biblioteca
        </Link>
      </div>
    </div>
  );

  const formattedDate = new Date(tip.published_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white selection:bg-orquidea-gold selection:text-orquidea-night">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orquidea-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Modern Hero Section */}
      <header className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-orquidea-night">
        <FlourParticles opacity={0.3} />
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={tip.image || '/images/placeholders/tip-placeholder.jpg'} 
            alt={tip.title}
            fill
            className="object-cover opacity-40 scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orquidea-night via-orquidea-night/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center">
          {/* Top Left Navigation */}
          <div className="absolute top-32 left-4 md:left-12">
            <Link href="/dicas" className="inline-flex items-center gap-3 text-orquidea-gold/60 hover:text-orquidea-gold transition-all group">
              <div className="w-10 h-10 rounded-full border border-orquidea-gold/20 flex items-center justify-center group-hover:bg-orquidea-gold/10 transition-all">
                <ArrowLeft size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] hidden md:inline">Índice Profissional</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <Badge variant="gold" className="mb-10 px-8 py-2.5 text-[10px] uppercase tracking-[0.5em] bg-orquidea-gold text-orquidea-night border-none">
              Dica Especializada
            </Badge>

            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.95] font-serif tracking-tighter mb-12 italic">
              {tip.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-8 text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-orquidea-gold" />
                {tip.published_at ? formattedDate : 'Edição Recente'}
              </div>
              <div className="w-2 h-2 rounded-full bg-orquidea-gold/20" />
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-orquidea-gold" />
                Leitura estimada: 4 min
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-orquidea-gold/40 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-orquidea-gold to-transparent" />
        </motion.div>
      </header>

      {/* Article Body */}
      <article className="relative bg-white pt-32 pb-40 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Executive Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-24 p-12 bg-slate-50 rounded-[4rem] border-l-[12px] border-orquidea-gold relative"
          >
            <div className="absolute -top-6 left-12 w-16 h-16 bg-orquidea-night rounded-3xl flex items-center justify-center text-orquidea-gold shadow-2xl">
              <BookOpen size={28} />
            </div>
            <p className="text-3xl md:text-4xl font-serif italic text-orquidea-night leading-snug tracking-tight">
              {tip.summary}
            </p>
          </motion.div>

          {/* Prose Content */}
          <div className="prose prose-2xl prose-slate max-w-none 
            prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-12
            prose-headings:font-serif prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-orquidea-night prose-headings:mt-32 prose-headings:mb-12
            prose-strong:text-orquidea-green prose-strong:font-black
            prose-img:rounded-[4rem] prose-img:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] prose-img:my-24
            prose-li:text-slate-600 prose-li:font-medium
            break-words
          ">
            {tip.content.split('\n').map((para, i) => (
              para.trim() ? <p key={i}>{para}</p> : <div key={i} className="h-8" />
            ))}
          </div>

          {/* Footer Interaction */}
          <footer className="mt-40 pt-24 border-t border-slate-100 flex flex-col items-center">
            <div className="w-20 h-1 bg-orquidea-gold/30 rounded-full mb-16" />
            
            <div className="grid md:grid-cols-2 gap-12 w-full mb-24">
              <div className="p-10 bg-slate-50 rounded-[3rem] text-center border border-slate-100 hover:border-orquidea-gold/30 transition-all">
                <h4 className="text-xl font-black text-orquidea-night mb-4 uppercase tracking-tighter">Ficou com alguma dúvida?</h4>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">Nossos especialistas técnicos estão à disposição para consultoria exclusiva.</p>
                <button className="px-8 py-4 bg-orquidea-night text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orquidea-green transition-all shadow-xl">Contatar Consultor</button>
              </div>
              <div className="p-10 bg-orquidea-night rounded-[3rem] text-center shadow-2xl shadow-orquidea-night/20 group">
                <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Potencialize seus resultados</h4>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">Conheça a linha profissional completa da Orquídea para o seu negócio.</p>
                <Link href="/catalogo">
                  <button className="w-full py-4 bg-white text-orquidea-night rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-orquidea-gold transition-all">
                    Ver Catálogo
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Compartilhe este conhecimento</p>
              <div className="flex gap-4">
                <button className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orquidea-night hover:border-orquidea-night transition-all">
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="px-8 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-xs font-black text-slate-600 hover:bg-orquidea-gold/10 transition-all uppercase tracking-widest"
                >
                  Copiar Link
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* Floating Action for Mobile/Readability */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <button className="px-8 py-4 bg-orquidea-night text-white rounded-full shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest border border-white/10 backdrop-blur-md">
          <BookOpen size={16} className="text-orquidea-gold" />
          Ações da Dica
        </button>
      </motion.div>
    </main>
  );
}
