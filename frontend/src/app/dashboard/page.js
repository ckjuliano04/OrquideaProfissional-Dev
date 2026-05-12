'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  ShoppingBag, 
  PlayCircle, 
  ClipboardList, 
  ChevronRight, 
  LogOut, 
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <PageSkeleton />;
  if (!user) return null;

  const roleColors = {
    admin: "gold",
    tecnico: "tech",
    vendedor: "seller",
    cliente: "secondary"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-grow bg-slate-50 pb-20 pt-32">
      {/* Welcome Banner */}
      <div className="bg-orquidea-night text-white py-24 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-orquidea-green/20 to-transparent z-0" 
        />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="glass" className="mb-4 animate-pulse">
                <ShieldCheck size={12} className="mr-2" />
                Painel Restrito
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 font-sans">
                Olá, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-orquidea-cream/60 text-lg md:text-xl font-serif italic">
                Sua central de ferramentas e conteúdo exclusivo Orquídea.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] flex items-center gap-5 shadow-2xl group transition-all hover:bg-white/10"
            >
              <div className="w-14 h-14 bg-orquidea-gold rounded-2xl flex items-center justify-center font-black text-2xl text-orquidea-night shadow-inner group-hover:scale-110 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] text-orquidea-cream/40 font-black uppercase tracking-[0.2em] mb-1">Perfil Ativo</p>
                <Badge variant={roleColors[user.role?.toLowerCase()] || "secondary"}>
                  {user.role}
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Hub Content */}
      <div className="container mx-auto px-4 max-w-5xl mt-[-4rem] relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          
          {/* Card 1: Área Comercial / Vendedor */}
          {['vendedor', 'interno', 'admin'].includes(user.role?.toLowerCase()) && (
            <motion.div variants={itemVariants}>
              <Link href="/catalogo" className="block group h-full">
                <Card className="h-full border-none shadow-lg hover:shadow-2xl overflow-hidden relative transition-all duration-500 group-hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orquidea-seller/5 rounded-bl-[5rem] -z-10 group-hover:bg-orquidea-seller/10 transition-colors" />
                  <CardHeader>
                    <div className="w-16 h-16 bg-orquidea-seller/10 text-orquidea-seller rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-orquidea-seller group-hover:text-white transition-all duration-500">
                      <ShoppingBag size={32} />
                    </div>
                    <CardTitle className="text-2xl font-black group-hover:text-orquidea-seller transition-colors">Área Vendedor</CardTitle>
                    <CardDescription className="text-base font-medium">
                      Fichas técnicas, imagens em alta resolução e argumentos de vendas para seu dia a dia.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-orquidea-seller font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Explorar Catálogo
                      <ChevronRight size={18} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* Card 2: Área Técnica / Treinamentos */}
          {['tecnico', 'interno', 'admin', 'profissional'].includes(user.role?.toLowerCase()) && (
            <motion.div variants={itemVariants}>
              <Link href="/treinamentos" className="block group h-full">
                <Card className="h-full border-none shadow-lg hover:shadow-2xl overflow-hidden relative transition-all duration-500 group-hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orquidea-tech/5 rounded-bl-[5rem] -z-10 group-hover:bg-orquidea-tech/10 transition-colors" />
                  <CardHeader>
                    <div className="w-16 h-16 bg-orquidea-tech/10 text-orquidea-tech rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-orquidea-tech group-hover:text-white transition-all duration-500">
                      <PlayCircle size={32} />
                    </div>
                    <CardTitle className="text-2xl font-black group-hover:text-orquidea-tech transition-colors">Capacitação Técnica</CardTitle>
                    <CardDescription className="text-base font-medium">
                      Vídeo-aulas, dicas exclusivas e manuais de panificação. O hub de reciclagem profissional.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-orquidea-tech font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Acessar Treinos
                      <ChevronRight size={18} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* Card 3: Área Cliente */}
          {['cliente'].includes(user.role?.toLowerCase()) && (
            <motion.div variants={itemVariants} className="md:col-span-2">
              <Link href="/catalogo" className="block group">
                <Card className="h-full border-none shadow-lg hover:shadow-2xl overflow-hidden relative transition-all duration-500 group-hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-orquidea-green/5 rounded-bl-[6rem] -z-10 group-hover:bg-orquidea-green/10 transition-colors" />
                  <CardHeader>
                    <div className="w-16 h-16 bg-orquidea-green/10 text-orquidea-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orquidea-green group-hover:text-white transition-all duration-500">
                      <ClipboardList size={32} />
                    </div>
                    <CardTitle className="text-3xl font-black group-hover:text-orquidea-green transition-colors">Área do Cliente</CardTitle>
                    <CardDescription className="text-lg font-medium">
                      Bem-vindo! Acesse nosso catálogo completo e entre em contato com seu representante comercial.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="primary" size="lg">
                      Ir para o Catálogo
                      <ChevronRight size={20} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}

        </motion.div>
        
        {/* Settings & Logout */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16 pt-8 border-t border-slate-200"
        >
          <button className="flex items-center gap-2 text-slate-400 hover:text-orquidea-green font-black text-[10px] uppercase tracking-[0.2em] transition-colors">
            <Settings size={16} />
            Configurações da Conta
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-slate-400 hover:text-orquidea-red font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
          >
            <LogOut size={16} />
            Encerrar Sessão Segura
          </button>
        </motion.div>
      </div>
    </div>
  );
}

