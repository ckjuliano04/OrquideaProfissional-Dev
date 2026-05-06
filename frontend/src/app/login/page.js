'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import Image from 'next/image';

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
    <main className="flex-grow flex items-center justify-center bg-slate-50 relative overflow-hidden py-12">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orquidea-green/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orquidea-light/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 flex justify-center">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/logos/OrquideaProfissional_Logo_Transparente.png" 
                alt="Orquídea Profissional" 
                width={200}
                height={96}
                priority
                className="h-24 w-auto object-contain mx-auto transition-all duration-300 hover:scale-105 drop-shadow-md"
              />
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Acesso Restrito</h1>
            <p className="text-slate-500">Faça login para acessar os materiais técnicos.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orquidea-green/20 focus:border-orquidea-green transition-all"
                placeholder="seu@email.com.br"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orquidea-green/20 focus:border-orquidea-green transition-all"
                placeholder="••••••••"
                required
              />
              <div className="flex justify-end mt-2">
                <Link href="#" className="text-sm font-medium text-orquidea-green hover:text-orquidea-dark transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-orquidea-green/20 transition-all duration-300 flex justify-center items-center gap-2
                ${isSubmitting ? 'bg-orquidea-green/70 cursor-wait' : 'bg-orquidea-green hover:bg-orquidea-dark hover:shadow-orquidea-green/40 hover:-translate-y-0.5'}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </>
              ) : 'Entrar no Portal'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Não tem uma conta?{' '}
              <Link href="/contato" className="font-semibold text-orquidea-green hover:text-orquidea-dark transition-colors">
                Fale com o suporte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
