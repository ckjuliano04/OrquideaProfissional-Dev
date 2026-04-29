import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Orquídea Profissional | Autoridade Técnica",
  description: "Plataforma de conteúdo técnico e catálogo profissional.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
