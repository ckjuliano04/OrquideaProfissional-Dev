import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

// Brand Icon Components (Replacement for removed Lucide brand icons)
const FacebookIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orquidea-night text-white mt-auto border-t border-white/5">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-8 flex justify-center md:justify-start w-full">
              <Image
                src="/logos/OrquideaProfissional_Logo_Transparente.png"
                alt="Orquídea Profissional"
                width={180}
                height={80}
                className="h-16 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
            </div>
            <p className="text-orquidea-cream/50 text-base leading-relaxed max-w-sm font-medium italic font-serif">
              A excelência técnica em cada grão. Nossa plataforma profissional
              conecta especialistas e parceiros através de conhecimento e
              qualidade superior.
            </p>
            <div className="flex justify-center md:justify-start gap-5 mt-10">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orquidea-green hover:text-white transition-all duration-300"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orquidea-green hover:text-white transition-all duration-300"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orquidea-green hover:text-white transition-all duration-300"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Links e Institucional */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orquidea-gold mb-8">
              Navegação
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#quem-somos"
                  className="text-sm font-bold text-orquidea-cream/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Nossa História{" "}
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-sm font-bold text-orquidea-cream/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Catálogo de Produtos{" "}
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/#dicas"
                  className="text-sm font-bold text-orquidea-cream/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Conhecimento Técnico{" "}
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm font-bold text-orquidea-cream/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  Portal do Parceiro{" "}
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato & Termos */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orquidea-gold mb-8">
              Atendimento
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-orquidea-green">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">
                    Televendas
                  </p>
                  <p className="text-sm font-bold text-orquidea-cream/80">
                    0800 644 1234
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-orquidea-green">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">
                    Sede Administrativa
                  </p>
                  <p className="text-sm font-bold text-orquidea-cream/80">
                    Caxias do Sul, RS - Brasil
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Letras miúdas */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.1em] text-white/30">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span>© {currentYear} Orquídea Alimentos.</span>
            <div className="flex gap-6">
              <Link
                href="#"
                className="hover:text-orquidea-green transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="#"
                className="hover:text-orquidea-green transition-colors"
              >
                Termos
              </Link>
              <Link
                href="#"
                className="hover:text-orquidea-green transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            Desenvolvido com excelência técnica
          </div>
        </div>
      </div>
    </footer>
  );
}
