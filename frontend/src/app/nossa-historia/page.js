'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import FlourParticles from '@/components/FlourParticles';

export default function NossaHistoriaPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-orquidea-green overflow-hidden">
        <FlourParticles opacity={0.6} />
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl"
          >
            Nossa História
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-orquidea-cream max-w-2xl mx-auto font-medium"
          >
            Mais de 70 anos transformando o trigo em autoridade técnica e sabor.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Resumo e Origem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div {...fadeIn} className="md:w-1/2">
              <h2 className="text-orquidea-green text-sm font-black uppercase tracking-widest mb-4">Desde 1953</h2>
              <h3 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Uma trajetória marcada pela excelência e tradição.</h3>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Fundada em agosto de 1953 pelos irmãos Tondo, na cidade de Pinto Bandeira, no Rio Grande do Sul, a Orquídea nasceu a partir de um pequeno moinho de trigo. Com o passar dos anos, a empresa expandiu sua atuação e consolidou-se como uma das maiores do setor na região Sul do Brasil, contando hoje com uma das maiores capacidades de moagem de trigo do país, que chega a 48 mil toneladas por mês.
                </p>
                <p>
                  A evolução da Orquídea é marcada por um compromisso contínuo com qualidade e inovação. Essa trajetória deu origem à Orquídea Profissional, uma marca desenvolvida especialmente para atender às necessidades de quem vive da produção: padarias, confeitarias, cozinhas profissionais e indústrias.
                </p>
                <p>
                  Com um portfólio completo e soluções pensadas para o dia a dia do profissional, a Orquídea Profissional reúne tecnologia, desempenho e praticidade, garantindo resultados consistentes e de alta qualidade. Mais do que produtos, oferecemos parceria, conhecimento e confiança para impulsionar negócios e valorizar cada criação.
                </p>
                <p className="font-black text-orquidea-green">
                  Orquídea Profissional é a evolução de uma história sólida, feita para quem transforma ingredientes em resultados.
                </p>
              </div>
            </motion.div>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="md:w-1/2 relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <Image src="/logos/OrquideaProfissional_Logo_Transparente.png" alt="História Orquídea" width={400} height={300} className="w-full h-auto p-12 bg-slate-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Atuação e Diferencial */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <motion.h2 {...fadeIn} className="text-4xl font-black text-slate-900 mb-6">Nossa Atuação</motion.h2>
          <motion.p {...fadeIn} className="text-slate-500 max-w-2xl mx-auto text-lg">
            Atendemos todo o ecossistema da alimentação com produtos de alta performance.
          </motion.p>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Panificação", desc: "Mix completo de farinhas e pré-misturas para pães artesanais e industriais.", icon: "🥖" },
            { title: "Confeitaria", desc: "Soluções técnicas para massas leves, bolos e acabamentos profissionais.", icon: "🧁" },
            { title: "Massas e Biscoitos", desc: "Produção em larga escala com rigoroso controle de qualidade.", icon: "🍝" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <span className="text-5xl mb-6 block">{item.icon}</span>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unidades */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <motion.div {...fadeIn} className="md:w-1/2">
              <h3 className="text-4xl font-black text-slate-900 mb-8">Nossas Unidades</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Com sede em Caxias do Sul (RS) e diversas unidades estratégicas, a Orquídea conta com uma logística robusta para garantir a entrega pontual.
              </p>
              <ul className="space-y-4">
                {["Moinho Principal - Caxias do Sul", "Unidade Industrial - Jaguaré", "Unidade Industrial - Bento Gonçalves"].map((unidade, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800 font-bold">
                    <span className="w-2 h-2 bg-orquidea-green rounded-full"></span>
                    {unidade}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="md:w-1/2 relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 group hover:scale-[1.02] transition-transform duration-500">
                <Image 
                  src="/images/orquidea___foto_aerea-9805123.png" 
                  alt="Unidades Orquídea" 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
