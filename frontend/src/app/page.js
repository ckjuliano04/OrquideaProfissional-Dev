"use client";

import Link from "next/link";
import Image from "next/image";
import FlourParticles from "@/components/FlourParticles";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SliceReveal from "@/components/SliceReveal";
import { normalizeHomeData } from "@/services/normalizers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Play, BookOpen, Globe, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${apiUrl}/cms/home/`)
      .then((res) => res.json())
      .then((cmsData) => setData(normalizeHomeData(cmsData)))
      .catch((err) => console.error("Erro ao carregar dados do CMS:", err));
  }, [apiUrl]);

  if (!data) return <div className="min-h-screen bg-orquidea-night" />;

  return (
    <div className="grow flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-orquidea-night text-white">
        <FlourParticles opacity={0.4} />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-orquidea-night/40 via-orquidea-night/80 to-orquidea-night z-10" />
        </div>

        <div className="container mx-auto px-4 z-20 relative text-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/logos/OrquideaProfissional_Logo_Transparente.png"
                  alt="Orquídea Profissional"
                  width={300}
                  height={160}
                  priority
                  className="w-64 md:w-72 mb-8 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                  style={{ height: "auto" }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] font-sans">
                {data.hero_title.split("Técnica").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-orquidea-cream via-orquidea-gold to-orquidea-cream">
                        Técnica
                      </span>
                    )}
                  </span>
                ))}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <p className="text-xl md:text-2xl text-orquidea-cream/80 mb-12 max-w-2xl leading-relaxed font-medium mx-auto font-serif italic">
                {data.hero_subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-2xl mx-auto"
            >
              <Link href="/login" className="flex-1">
                <Button variant="destructive" size="xl" className="w-full">
                  Acessar Portal
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/catalogo" className="flex-1">
                <Button variant="glass" size="xl" className="w-full">
                  Explorar Catálogo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-12 rounded-full bg-linear-to-b from-orquidea-gold to-transparent opacity-50"
          />
        </motion.div>
      </section>

      {/* QUEM SOMOS / NOSSA HISTÓRIA */}
      <section
        id="quem-somos"
        className="py-32 bg-orquidea-cream/30 scroll-mt-20 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <ScrollReveal direction="left">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-4/3 bg-slate-200 rounded-3xl overflow-hidden relative shadow-2xl border-8 border-white group cursor-pointer"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
                    alt="Nossa História"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-orquidea-green/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollReveal direction="right">
                <Badge variant="secondary" className="mb-6">
                  Nossa História
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight font-serif tracking-tight">
                  {data.about_title}
                </h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                  <p>{data.about_text1}</p>
                  {data.about_text2 && <p>{data.about_text2}</p>}
                </div>

                <div className="grid grid-cols-2 gap-10 mt-12 pt-10 border-t border-slate-200">
                  <motion.div whileHover={{ y: -5 }}>
                    <h4 className="font-black text-orquidea-green text-4xl mb-1 tracking-tighter">
                      {data.about_stat1_title}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {data.about_stat1_desc}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }}>
                    <h4 className="font-black text-orquidea-green text-4xl mb-1 tracking-tighter">
                      {data.about_stat2_title}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {data.about_stat2_desc}
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Slice Animation Section */}
      <SliceReveal />

      {/* DICAS */}
      <section id="dicas" className="py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6">
              Conhecimento Técnico
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-20 font-serif tracking-tight">
              Dicas de Uso
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {data.tips?.map((tip, index) => (
              <ScrollReveal key={tip.id} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  <div className="h-64 overflow-hidden relative">
                    <Image
                      src={tip.image_url}
                      alt={tip.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge variant="glass">Técnico</Badge>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col grow">
                    <h3 className="font-black text-2xl text-slate-900 mb-4 group-hover:text-orquidea-green transition-colors leading-tight">
                      {tip.title}
                    </h3>
                    <p className="text-slate-500 mb-10 text-sm leading-relaxed grow font-medium">
                      {tip.description}
                    </p>
                    <Link
                      href="/dicas"
                      className="group/link inline-flex items-center gap-3 text-orquidea-green font-black text-xs uppercase tracking-widest"
                    >
                      Ver Dica Completa
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-10 h-10 rounded-full bg-orquidea-green/5 flex items-center justify-center group-hover/link:bg-orquidea-green group-hover/link:text-white transition-all transform group-hover/link:translate-x-1"
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="mt-20">
              <Link href="/dicas">
                <Button
                  variant="outline"
                  size="xl"
                  className="rounded-2xl px-12 gap-3 border-slate-200 text-slate-600 hover:border-orquidea-green hover:text-orquidea-green"
                >
                  Ver todas as Dicas Profissionais
                  <ChevronRight size={18} />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ORQUÍDEA ALIMENTOS (Marcas) */}
      <section
        id="orquidea-alimentos"
        className="py-24 bg-orquidea-cream/20 scroll-mt-20 border-t border-slate-100"
      >
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-serif">
              Família Orquídea Alimentos
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
              Nossa atuação vai além do profissional. Conheça as nossas marcas
              focadas em levar sabor e qualidade para a mesa de milhares de
              famílias todos os dias.
            </p>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="flex flex-wrap justify-center gap-10"
          >
            {data.brands?.map((brand, index) => (
              <motion.div
                key={brand.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <a
                  href={brand.link || "#"}
                  target={brand.link ? "_blank" : "_self"}
                  className="w-40 h-40 bg-white rounded-full shadow-md hover:shadow-2xl hover:border-orquidea-green border border-slate-100 flex flex-col items-center justify-center transition-all duration-500 group overflow-hidden"
                >
                  <span className="font-black text-slate-800 group-hover:text-orquidea-green text-center px-4 tracking-tighter leading-tight transition-colors">
                    {brand.name}
                  </span>
                  {brand.link && (
                    <div className="mt-2 flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-slate-300 group-hover:text-orquidea-gold transition-colors">
                      <Globe size={10} />
                      Visitar
                    </div>
                  )}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ONDE COMPRAR */}
      <section
        id="onde-comprar"
        className="py-32 bg-orquidea-night text-white scroll-mt-16 relative overflow-hidden"
      >
        <FlourParticles opacity={0.3} />
        <div className="absolute inset-0 bg-orquidea-green/5 mix-blend-overlay z-0 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black mb-8 font-serif tracking-tight">
              {data.where_to_buy_title}
            </h2>
            <p className="text-orquidea-cream/70 text-xl mb-12 leading-relaxed font-medium font-serif italic">
              {data.where_to_buy_text}
            </p>
            <Link href="/onde-comprar">
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 md:p-20 rounded-3xl shadow-2xl relative group overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-orquidea-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-orquidea-gold">
                  Encontre um Parceiro Próximo
                </h4>
                <p className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter transition-transform group-hover:scale-105 duration-500 leading-tight">
                  Consultar Listagem <br className="hidden md:block" /> de
                  Vendedores
                </p>
                <div className="inline-flex items-center gap-4 bg-orquidea-gold text-orquidea-night px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-orquidea-gold/20">
                  Ver Vendedores
                  <ArrowRight size={20} />
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
