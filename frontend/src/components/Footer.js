import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orquidea-night text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img 
                src="/logos/OrquideaProfissional_Logo_Transparente.png" 
                alt="Orquídea Profissional" 
                className="h-16 w-auto object-contain filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Plataforma de conteúdo técnico e catálogo profissional. Materiais exclusivos, 
              treinamentos e documentações para profissionais do setor alimentício.
            </p>
          </div>

          {/* Links e Institucional */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Institucional</h4>
            <ul className="space-y-2.5">
              <li><Link href="/#quem-somos" className="text-sm text-slate-400 hover:text-white transition-colors">Nossa História</Link></li>
              <li><Link href="/catalogo" className="text-sm text-slate-400 hover:text-white transition-colors">Produtos</Link></li>
              <li><Link href="/#dicas" className="text-sm text-slate-400 hover:text-white transition-colors">Dicas de Uso</Link></li>
              <li><Link href="/#orquidea-alimentos" className="text-sm text-slate-400 hover:text-white transition-colors">Orquídea Alimentos</Link></li>
              <li><Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">Área Restrita</Link></li>
            </ul>
          </div>

          {/* Contato & Termos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Atendimento</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Entre em contato</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Trabalhe conosco</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Termos de uso</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Letras miúdas */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span>© {currentYear} Orquídea Alimentos. Todos os direitos reservados.</span>
            <span className="hidden md:inline">|</span>
            <span>SAC: 0800 000 0000</span>
            <span className="hidden md:inline">|</span>
            <span>Rua Exemplo, 123 - Cidade/UF</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
