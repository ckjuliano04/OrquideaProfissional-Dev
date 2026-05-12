'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TipCard({ tip }) {
  const formattedDate = new Date(tip.published_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
    >
      <Link href={`/dicas/${tip.slug}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={tip.image || '/images/placeholders/tip-placeholder.jpg'}
            alt={tip.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-6 left-6">
            <div className="bg-orquidea-gold text-orquidea-night px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              Dica Técnica
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Calendar size={14} className="text-orquidea-gold" />
            {formattedDate}
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-orquidea-green transition-colors font-serif">
            {tip.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
            {tip.summary}
          </p>

          <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-orquidea-green font-black text-xs uppercase tracking-widest group/link">
              Ler Conteúdo Completo
              <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-orquidea-green/10 group-hover:text-orquidea-green transition-colors">
              <BookOpen size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
