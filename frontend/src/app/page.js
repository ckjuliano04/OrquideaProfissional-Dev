import Link from 'next/link';
import Image from 'next/image';
import FlourParticles from '@/components/FlourParticles';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SliceReveal from '@/components/SliceReveal';
import { normalizeHomeData } from '@/services/normalizers';

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  let cmsData = null;
  
  try {
    const res = await fetch(`${apiUrl}/cms/home/`, { next: { revalidate: 60 } }); 
    if (res.ok) {
      cmsData = await res.json();
    }
  } catch (error) {
    console.error("Erro ao carregar dados do CMS:", error);
  }

  const data = normalizeHomeData(cmsData);

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-orquidea-night text-white">
        <FlourParticles opacity={0.6} />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-orquidea-night/40 via-orquidea-night/80 to-orquidea-night z-10" />
        </div>

        <div className="container mx-auto px-4 z-20 relative text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <ScrollReveal direction="down">
              <Image 
                src="/logos/OrquideaProfissional_Logo_Transparente.png" 
                alt="Orquídea Profissional" 
                width={320}
                height={180}
                priority
                className="w-72 md:w-80 mb-6 drop-shadow-2xl"
                style={{ height: 'auto' }}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
                {data.hero_title.split('Técnica').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orquidea-cream via-orquidea-gold to-orquidea-cream">
                        Técnica
                      </span>
                    )}
                  </span>
                ))}
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <p className="text-xl md:text-2xl text-orquidea-cream/80 mb-12 max-w-2xl leading-relaxed font-medium mx-auto">
                {data.hero_subtitle}
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6} direction="up">
              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                <Link 
                  href="/login" 
                  className="px-10 py-5 bg-orquidea-red hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-orquidea-red/20 hover:shadow-orquidea-red/40 hover:-translate-y-1 text-center text-lg uppercase tracking-wider min-w-[260px]"
                >
                  Acessar Portal Restrito
                </Link>
                <Link 
                  href="/catalogo" 
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black rounded-2xl transition-all text-center text-lg uppercase tracking-wider min-w-[260px]"
                >
                  Explorar Catálogo
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS / NOSSA HISTÓRIA */}
      <section id="quem-somos" className="py-32 bg-orquidea-cream/30 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <ScrollReveal direction="left">
                <div className="aspect-[4/3] bg-slate-200 rounded-[3rem] overflow-hidden relative shadow-2xl border-8 border-white group">
                  <Image 
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800" 
                    alt="Nossa História" 
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-orquidea-green/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </ScrollReveal>
            </div>
            <div className="w-full lg:w-1/2">
              <ScrollReveal direction="right">
                <span className="text-orquidea-green font-black tracking-[0.3em] text-xs uppercase mb-4 block">Nossa História</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">{data.about_title}</h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p>{data.about_text1}</p>
                  {data.about_text2 && <p>{data.about_text2}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-10 mt-12 pt-10 border-t border-slate-200">
                  <div>
                    <h4 className="font-black text-orquidea-green text-3xl mb-1">{data.about_stat1_title}</h4>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{data.about_stat1_desc}</p>
                  </div>
                  <div>
                    <h4 className="font-black text-orquidea-green text-3xl mb-1">{data.about_stat2_title}</h4>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{data.about_stat2_desc}</p>
                  </div>
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
            <span className="text-orquidea-green font-black tracking-[0.3em] text-xs uppercase mb-4 block">Conhecimento Técnico</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">Dicas de Uso</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            {data.tips?.map((tip, index) => (
              <ScrollReveal key={tip.id} delay={index * 0.2}>
                <div className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                  <div className="h-64 overflow-hidden relative">
                    <Image src={tip.image_url} alt={tip.title} width={600} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-orquidea-green shadow-sm">
                      Técnico
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-black text-2xl text-slate-900 mb-4 group-hover:text-orquidea-green transition-colors">{tip.title}</h3>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed flex-grow">{tip.description}</p>
                    <a href={tip.link} className="inline-flex items-center gap-3 text-orquidea-green font-black text-sm uppercase tracking-wider group/btn">
                      Ver Conteúdo 
                      <span className="w-8 h-8 rounded-full bg-orquidea-green/10 flex items-center justify-center group-hover/btn:bg-orquidea-green group-hover/btn:text-white transition-all">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ORQUÍDEA ALIMENTOS (Marcas) */}
      <section id="orquidea-alimentos" className="py-24 bg-orquidea-cream/20 scroll-mt-20 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Família Orquídea Alimentos</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Nossa atuação vai além do profissional. Conheça as nossas marcas focadas em levar sabor e qualidade para a mesa de milhares de famílias todos os dias.
            </p>
          </ScrollReveal>
          
          <div className="flex flex-wrap justify-center gap-8">
            {data.brands?.map((brand, index) => (
              <ScrollReveal key={brand.id} delay={index * 0.1} direction="up">
                <a href={brand.link || '#'} target={brand.link ? "_blank" : "_self"} className="w-44 h-44 bg-white rounded-full shadow-sm hover:shadow-xl hover:border-orquidea-green border border-slate-100 flex flex-col items-center justify-center transition-all duration-500 group overflow-hidden">
                  <span className="font-black text-slate-800 group-hover:text-orquidea-green text-center px-4 tracking-tight leading-tight transition-colors">{brand.name}</span>
                  {brand.link && <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 group-hover:text-orquidea-gold">Visitar site</span>}
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ONDE COMPRAR */}
      <section id="onde-comprar" className="py-24 bg-orquidea-night text-white scroll-mt-16 relative overflow-hidden">
        <FlourParticles opacity={0.5} />
        <div className="absolute inset-0 bg-orquidea-green/5 mix-blend-overlay z-0 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{data.where_to_buy_title}</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            {data.where_to_buy_text}
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
            <h4 className="text-xl font-bold mb-4">Televendas Profissional</h4>
            <p className="text-3xl font-black text-orquidea-light mb-2">{data.where_to_buy_phone}</p>
            <p className="text-slate-400 text-sm">{data.where_to_buy_hours}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
