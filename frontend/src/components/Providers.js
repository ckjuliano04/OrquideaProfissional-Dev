'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-24 md:pt-28">{children}</main>
          <Footer />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
