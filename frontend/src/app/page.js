import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orquidea-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orquidea-light/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="bg-white/80 backdrop-blur-xl p-12 md:p-16 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-4xl mx-auto border border-slate-100 transform transition-all duration-500 hover:shadow-[0_8px_40px_rgb(21,128,61,0.08)]">
          
          <div className="inline-block px-6 py-2 bg-orquidea-green/10 rounded-full text-orquidea-green font-bold tracking-wider text-sm mb-8 border border-orquidea-green/20">
            ORQUÍDEA PROFISSIONAL
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Conteúdo <span className="text-orquidea-green">Técnico</span><br/>
            para Especialistas
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Acesse o catálogo completo, materiais de treinamento exclusivos e documentações técnicas em um único portal feito para profissionais.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-4 bg-orquidea-green hover:bg-orquidea-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-orquidea-green/30 hover:shadow-orquidea-green/50 hover:-translate-y-1"
            >
              Acessar Plataforma
            </Link>
            <Link 
              href="/catalogo" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-orquidea-green text-orquidea-green hover:bg-orquidea-green/5 font-semibold rounded-xl transition-all duration-300"
            >
              Ver Catálogo Aberto
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
