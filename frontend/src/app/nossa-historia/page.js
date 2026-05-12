'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import FlourParticles from '@/components/FlourParticles';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  History, 
  MapPin, 
  Wheat, 
  Coffee, 
  Award, 
  TrendingUp, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NossaHistoriaPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-orquidea-night text-white pt-24">
        <FlourParticles opacity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-orquidea-night/40 to-orquidea-night z-0" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Badge variant="gold" className="mb-6 px-6 py-2 text-[10px] uppercase tracking-[0.3em]">Nossa Essência</Badge>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 font-serif tracking-tight leading-tight">
              História e <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orquidea-gold via-orquidea-cream to-orquidea-gold">
                Tradição
              </span>
            </h1>
            <p className="text-orquidea-cream/60 text-xl md:text-2xl max-w-3xl mx-auto font-serif italic leading-relaxed">
              Desde 1953, transformando a excelência do trigo em arte para a sua mesa e performance para o seu negócio.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Desvendar</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-12 rounded-full bg-gradient-to-b from-orquidea-gold to-transparent opacity-50"
          />
        </motion.div>
      </section>

      {/* Resumo e Origem */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div {...fadeIn} className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-1 bg-orquidea-gold" />
                <span className="text-orquidea-green text-sm font-black uppercase tracking-[0.3em]">Desde 1953</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-[1.1] tracking-tighter font-serif">
                Uma trajetória de <span className="text-orquidea-gold">excelência</span> e tradição.
              </h2>
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  Fundada em agosto de 1953 pelos irmãos Tondo, na cidade de Pinto Bandeira (RS), a Orquídea nasceu a partir de um pequeno moinho de trigo. Com o passar das décadas, a empresa expandiu sua atuação e consolidou-se como uma das maiores do setor na região Sul do Brasil.
                </p>
                <p>
                  Hoje, contamos com uma das maiores capacidades de moagem do país, atingindo 48 mil toneladas por mês. Nossa evolução é marcada por um compromisso inegociável com a inovação técnica e a pureza dos ingredientes.
                </p>
                <div className="p-8 bg-orquidea-cream/20 rounded-[2.5rem] border border-orquidea-gold/10">
                  <p className="text-orquidea-green font-black italic font-serif text-xl">
                    "Orquídea Profissional é a evolução de uma história sólida, feita sob medida para quem transforma insumos em resultados extraordinários."
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative group">
                <div className="absolute -inset-10 bg-orquidea-green/5 rounded-full blur-3xl group-hover:bg-orquidea-green/10 transition-colors" />
                <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white relative z-10 bg-slate-50 p-12">
                  <Image 
                    src="/logos/OrquideaProfissional_Logo_Transparente.png" 
                    alt="História Orquídea" 
                    width={800} 
                    height={600} 
                    className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110" 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Atuação e Diferencial */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl text-center mb-24">
          <motion.div {...fadeIn}>
            <Badge variant="tech" className="mb-6">Nosso Ecossistema</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 font-serif">Aplicações Profissionais</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Atendemos todo o setor alimentício com soluções que garantem performance superior e padronização em larga escala.
            </p>
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Panificação", desc: "Mix completo de farinhas e pré-misturas para pães artesanais e industriais.", icon: <Wheat size={32} />, color: "green" },
            { title: "Confeitaria", desc: "Soluções técnicas para massas leves, bolos e acabamentos profissionais de alta precisão.", icon: <Award size={32} />, color: "gold" },
            { title: "Industrial", desc: "Produção em larga escala com rigoroso controle de qualidade e suporte técnico especializado.", icon: <TrendingUp size={32} />, color: "night" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 group rounded-[3rem] overflow-hidden bg-white">
                <CardContent className="p-12">
                  <div className={cn(
                    "w-20 h-20 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500",
                    item.color === 'green' ? "bg-orquidea-green/10 text-orquidea-green group-hover:bg-orquidea-green group-hover:text-white" :
                    item.color === 'gold' ? "bg-orquidea-gold/10 text-orquidea-gold group-hover:bg-orquidea-gold group-hover:text-white" :
                    "bg-orquidea-night/10 text-orquidea-night group-hover:bg-orquidea-night group-hover:text-white"
                  )}>
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unidades */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
            <motion.div {...fadeIn} className="lg:w-1/2">
              <Badge variant="outline" className="mb-6">Nossas Unidades</Badge>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 font-serif leading-tight">Presença Estratégica em todo o Brasil.</h3>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                Com sede administrativa em Caxias do Sul (RS) e centros de distribuição otimizados, garantimos uma logística robusta para parceiros de todos os portes.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Moinho Principal - Caxias do Sul / RS",
                  "Unidade Industrial - Jaguaré / SP",
                  "Unidade Industrial - Bento Gonçalves / RS"
                ].map((unidade, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-4 text-slate-900 font-black text-sm uppercase tracking-widest group cursor-default"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-orquidea-green group-hover:bg-orquidea-green group-hover:text-white transition-colors">
                      <MapPin size={18} />
                    </div>
                    {unidade}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-16">
                <Link href="/catalogo">
                  <Button variant="primary" size="xl" className="group rounded-2xl">
                    Conheça Nossos Produtos
                    <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 group cursor-pointer relative">
                <Image 
                  src="/images/orquidea___foto_aerea-9805123.png" 
                  alt="Unidades Orquídea" 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orquidea-night/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

