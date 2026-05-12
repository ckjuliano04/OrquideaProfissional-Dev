'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavHeader from '@/components/ui/nav-header';
import { Button } from '@/components/ui/Button';
import { LogOut, Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detector de Scroll para efeito adaptativo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/nossa-historia', label: 'História' },
    { href: '/catalogo', label: 'Produtos' },
    { href: '/dicas', label: 'Dicas' },
    { href: '/onde-comprar', label: 'Onde comprar' },
    ...(isAuthenticated ? [
      { href: '/dashboard', label: 'Painel' },
      ...(user?.role !== 'CLIENTE' ? [{ href: '/treinamentos', label: 'Treinos' }] : []),
    ] : []),
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isTransparentPage = pathname === '/' || pathname === '/nossa-historia' || pathname.startsWith('/dicas');
  const showSolid = isScrolled || !isTransparentPage;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        showSolid 
          ? "h-16 bg-orquidea-night/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
          : "h-24 bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group h-full py-2" aria-label="Orquídea Profissional Home">
          <Image 
            src="/logos/OrquideaProfissional_Logo_Transparente.png" 
            alt="Orquídea Profissional" 
            width={220}
            height={120}
            priority
            className={cn(
              "transition-all duration-700 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] w-auto",
              showSolid ? "h-10 md:h-12" : "h-16 md:h-20"
            )}
          />
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden xl:block" aria-label="Navegação Principal">
          <NavHeader items={navLinks} />
        </nav>

        {/* User Area Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-8 border-l border-white/10">
              <div className="text-right hidden lg:block">
                <p className="text-[10px] font-black text-white/40 leading-tight uppercase tracking-widest mb-0.5">{user?.role}</p>
                <p className="text-sm font-black text-white leading-tight uppercase tracking-tight">{user?.name?.split(' ')[0]}</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-inner group relative overflow-hidden transition-all hover:border-orquidea-gold/50">
                <User size={20} className="z-10 group-hover:text-orquidea-gold transition-colors" />
                <div className="absolute inset-0 bg-orquidea-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <button
                onClick={logout}
                className="p-3 text-white/40 hover:text-orquidea-red hover:bg-white/5 rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-orquidea-red/50"
                aria-label="Encerrar Sessão"
                title="Sair"
              >
                <LogOut size={22} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button 
                variant={showSolid ? "destructive" : "glass"} 
                size="xl" 
                className="rounded-2xl px-10 font-black uppercase tracking-[0.15em] text-xs shadow-xl"
              >
                Área Restrita
              </Button>
            </Link>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white/10 text-white border border-white/10 transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={mobileOpen ? "Fechar Menu" : "Abrir Menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-navigation"
        className={cn(
          "fixed inset-0 top-16 bg-orquidea-night/95 backdrop-blur-2xl transition-all duration-500 md:hidden",
          mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="container mx-auto px-6 py-12 flex flex-col gap-4" aria-label="Navegação Mobile">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-2xl font-black uppercase tracking-tighter transition-all",
                isActive(link.href) ? "text-orquidea-gold" : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="mt-8 pt-8 border-t border-white/10">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-widest">{user?.name}</p>
                  <p className="text-xs text-orquidea-gold font-bold uppercase">{user?.role}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="destructive" className="w-full">
                  Acessar Portal
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}


