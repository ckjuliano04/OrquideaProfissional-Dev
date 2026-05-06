'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SliceReveal() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transforma o scroll em porcentagem de corte (clip-path)
  // Começa inteiro (100%) e vai revelando o corte até 0%
  const clipPath = useTransform(scrollYProgress, [0.1, 0.5], ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 50%)"]);
  const xOffset = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "-1%"]);

  return (
    <section ref={containerRef} className="relative py-32 bg-orquidea-night overflow-hidden min-h-[150vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Lado Esquerdo: Texto */}
          <div className="lg:w-1/2 z-10">
            <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-orquidea-gold font-black tracking-[0.3em] text-xs uppercase mb-4 block"
            >
              Excelência Técnica
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
            >
              O Segredo está <br/>
              <span className="text-orquidea-gold">no Interior.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orquidea-cream/70 max-w-xl leading-relaxed mb-12"
            >
              Nossa farinha de alta performance garante uma alveolagem superior, crocância externa e uma umidade interna que preserva o frescor por muito mais tempo.
            </motion.p>

            {/* Features Interativas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Maciez", desc: "Elasticidade perfeita da malha de glúten.", icon: "☁️" },
                { title: "Alveolagem", desc: "Estrutura aerada e leve.", icon: "🧼" },
                { title: "Umidade", desc: "Preservação natural do frescor.", icon: "💧" },
                { title: "Crocância", desc: "Crosta dourada e resistente.", icon: "🥖" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors cursor-default group"
                >
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-orquidea-cream/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lado Direito: A Mágica do Corte */}
          <div className="lg:w-1/2 relative aspect-square flex items-center justify-center">
            <div className="relative w-full max-w-2xl aspect-square bg-black mix-blend-lighten">
              
              {/* Imagem do Miolo (Fica por baixo) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/images/slice-miolo.png" 
                  alt="Pão Cortado" 
                  className="w-full h-full object-contain scale-[0.87] translate-y-[-0.5%] saturate-[1.3] contrast-[1.1]"
                />
              </div>

              {/* Imagem Inteira (Fica por cima e é cortada) */}
              <motion.div 
                style={{ clipPath, x: xOffset }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <img 
                  src="/images/slice-inteiro.png" 
                  alt="Pão Inteiro" 
                  className="w-full h-full object-contain saturate-[1.3] contrast-[1.1]"
                />
              </motion.div>

              {/* Linha de Corte Animada */}
              <motion.div 
                style={{ 
                    left: useTransform(scrollYProgress, [0.1, 0.5], ["100%", "50%"]),
                    opacity: useTransform(scrollYProgress, [0.05, 0.1, 0.5, 0.55], [0, 1, 1, 0])
                }}
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orquidea-gold to-transparent z-20 shadow-[0_0_20px_rgba(196,160,82,1)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
