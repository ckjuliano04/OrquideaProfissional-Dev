'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lightbulb, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import FlourParticles from '@/components/FlourParticles';
import TipCard from '@/components/TipCard';

export default function DicasClient({ initialTips }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTips = initialTips.filter(tip => 
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredTip = filteredTips[0];
  const regularTips = filteredTips.slice(1);

  return (
    <div className="flex-grow flex flex-col bg-white selection:bg-orquidea-gold selection:text-orquidea-night">
      {/* Editorial Header */}
      <section className="relative pt-48 pb-32 bg-orquidea-night overflow-hidden">
        <FlourParticles opacity={0.3} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orquidea-night via-orquidea-night/95 to-transparent z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="gold" className="mb-10 px-8 py-2.5 text-[10px] uppercase tracking-[0.5em] bg-orquidea-gold text-orquidea-night border-none shadow-2xl shadow-orquidea-gold/20">
                Hub de Conhecimento
              </Badge>
              <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] font-serif tracking-tighter mb-12 italic">
                Dicas <span className="text-orquidea-gold/80">Pro.</span>
              </h1>
              <p className="text-orquidea-cream/40 text-xl md:text-2xl max-w-3xl mx-auto font-serif italic leading-relaxed">
                Técnicas exclusivas, segredos da panificação e orientações dos nossos mestres para elevar o padrão da sua produção profissional.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl relative z-20 pb-40">
        {/* Search Bar - Editorial Style */}
        <div className="max-w-4xl mx-auto -mt-16 mb-24">
          <div className="bg-white p-4 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-4 group transition-all hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.2)]">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orquidea-gold transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="O que você deseja aprender hoje?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent border-none focus:ring-0 text-xl font-medium text-slate-900 placeholder:text-slate-300 px-2"
            />
            <div className="hidden md:flex gap-2 pr-2">
              <button 
                onClick={() => setSearchQuery('Fermentação')}
                className="bg-slate-50 hover:bg-orquidea-gold/10 hover:text-orquidea-gold transition-all px-6 py-3 rounded-2xl text-[9px] uppercase tracking-widest text-slate-400 font-black"
              >
                Fermentação
              </button>
              <button 
                onClick={() => setSearchQuery('Crocância')}
                className="bg-slate-50 hover:bg-orquidea-gold/10 hover:text-orquidea-gold transition-all px-6 py-3 rounded-2xl text-[9px] uppercase tracking-widest text-slate-400 font-black"
              >
                Crocância
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filteredTips.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-50 rounded-[4rem] border border-slate-100 p-32 text-center max-w-3xl mx-auto"
            >
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-12 text-slate-200 shadow-xl">
                <Lightbulb size={56} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 font-serif">Nenhum resultado</h3>
              <p className="text-slate-500 text-xl mb-12 leading-relaxed font-serif italic">
                Não encontramos dicas para sua busca. Tente palavras-chave como &quot;Pão&quot;, &quot;Pizza&quot; ou &quot;Fermento&quot;.
              </p>
              <Button variant="primary" onClick={() => setSearchQuery('')} className="rounded-full px-16 h-16 text-[10px] uppercase tracking-widest">
                Redescobrir Tudo
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-32">
              {/* Featured Card */}
              {!searchQuery && featuredTip && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative h-[70vh] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100"
                >
                  <Image 
                    src={featuredTip.image || '/images/placeholders/tip-placeholder.jpg'}
                    alt={featuredTip.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orquidea-night via-orquidea-night/40 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-12 md:p-20 flex flex-col items-start max-w-5xl">
                    <Badge variant="gold" className="mb-8 px-6 py-2">Destaque da Edição</Badge>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 font-serif leading-[0.95] tracking-tighter">
                      {featuredTip.title}
                    </h2>
                    <p className="text-white/60 text-xl mb-10 max-w-2xl line-clamp-2 font-serif italic">
                      {featuredTip.summary}
                    </p>
                    <Link href={`/dicas/${featuredTip.slug}`}>
                      <button className="px-12 py-5 bg-white text-orquidea-night rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-orquidea-gold transition-all shadow-2xl">
                        Ler Matéria Completa
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Regular Grid */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
              >
                {(searchQuery ? filteredTips : regularTips).map(tip => (
                  <motion.div
                    key={tip.id}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <TipCard tip={tip} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
