'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Mail, Lock, LogIn, LifeBuoy, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        addToast('Login realizado com sucesso! Bem-vindo.', 'success');
      } else {
        setError(result.message || 'E-mail ou senha incorretos.');
        addToast(result.message || 'Erro ao realizar login.', 'error');
      }
    } catch (err) {
      setError('Ocorreu um erro ao conectar ao servidor.');
      addToast('Erro de conexão com o servidor.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-32">
      {/* Background decorations */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orquidea-green/5 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-orquidea-gold/5 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto px-4 z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="border-none bg-white/70 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-[2.5rem]">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-10">
                <Link href="/" className="inline-block mb-10 group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image 
                      src="/logos/OrquideaProfissional_Logo_Transparente.png" 
                      alt="Orquídea Profissional" 
                      width={220}
                      height={100}
                      priority
                      className="h-20 w-auto object-contain mx-auto drop-shadow-lg"
                    />
                  </motion.div>
                </Link>
                <h1 className="text-4xl font-black text-slate-900 mb-3 font-serif tracking-tight">Acesso Restrito</h1>
                <p className="text-slate-500 font-medium">Insira suas credenciais para acessar a plataforma.</p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl flex items-center gap-3 font-black uppercase tracking-wider overflow-hidden"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">E-mail Corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orquidea-green/5 focus:border-orquidea-green transition-all font-medium text-sm"
                      placeholder="seu@email.com.br"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Sua Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orquidea-green/5 focus:border-orquidea-green transition-all font-medium text-sm"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex justify-end pr-1">
                    <motion.div whileHover={{ x: -5 }}>
                      <Link href="#" className="text-xs font-black uppercase tracking-widest text-orquidea-green hover:text-orquidea-night transition-colors">
                        Esqueceu a senha?
                      </Link>
                    </motion.div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="xl"
                  className="w-full rounded-2xl group/btn overflow-hidden relative"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      Entrar no Portal
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center">
                <Link href="/contato" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orquidea-green transition-colors group">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <LifeBuoy size={16} />
                  </motion.div>
                  Precisa de ajuda?
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}


