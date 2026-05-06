'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavHeader from '@/components/ui/nav-header';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detector de Scroll para efeito adaptativo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/nossa-historia', label: 'Nossa História' },
    { href: '/catalogo', label: 'Produtos' },
    { href: '/#dicas', label: 'Dicas' },
    { href: '/onde-comprar', label: 'Onde comprar' },
    { href: '/#orquidea-alimentos', label: 'Orquídea Alimentos' },
    ...(isAuthenticated ? [
      { href: '/dashboard', label: 'Painel' },
      { href: '/treinamentos', label: 'Treinamentos' },
    ] : []),
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b 
        ${isScrolled 
          ? 'h-20 bg-orquidea-green/80 backdrop-blur-lg border-white/10 shadow-2xl' 
          : 'h-24 md:h-28 bg-orquidea-green border-white/5 shadow-lg'
        }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between transition-all duration-500">
        {/* Logo - Apenas a logo limpa com sombra de destaque */}
        <Link href="/" className="flex items-center group h-full py-2">
          <Image 
            src="/logos/OrquideaProfissional_Logo_Transparente.png" 
            alt="Orquídea Profissional" 
            width={200}
            height={112}
            priority
            className={`transition-all duration-500 group-hover:scale-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] w-auto
              ${isScrolled ? 'h-14 md:h-16' : 'h-20 md:h-28'}
            `}
          />
        </Link>

        {/* Nav Desktop - Estilo Pílula Deslizante */}
        <nav className="hidden md:block">
          <NavHeader items={navLinks} />
        </nav>

        {/* User Area Desktop */}
        <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
          {isAuthenticated ? (
            <>
              <div className="text-right hidden lg:block text-orquidea-cream">
                <p className="text-sm font-bold leading-tight">{user?.name}</p>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-wider">{user?.role}</p>
              </div>
              <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white font-bold shadow-md border border-white/20">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <button
                onClick={logout}
                className="p-2 text-orquidea-cream/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                title="Sair"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-6 py-3 bg-orquidea-red hover:bg-red-700 text-white text-sm font-black rounded-xl transition-all shadow-xl shadow-black/20 hover:-translate-y-1"
            >
              Área Restrita
            </Link>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-3 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl animate-in slide-in-from-top shadow-xl pb-4">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive(link.href)
                    ? 'bg-orquidea-green/10 text-orquidea-green'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-100" />
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mx-4 py-3 bg-orquidea-green text-white text-center text-sm font-bold rounded-xl"
              >
                Área Restrita
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
