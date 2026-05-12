import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: {
    default: "Orquídea Profissional | Autoridade Técnica",
    template: "%s | Orquídea Profissional",
  },
  description:
    "Plataforma de conteúdo técnico e catálogo profissional para a indústria de alimentos.",
  keywords: [
    "farinha",
    "confeitaria",
    "panificação",
    "orquídea alimentos",
    "técnico",
  ],
  authors: [{ name: "Orquídea Profissional" }],
  creator: "Orquídea Profissional",
  publisher: "Orquídea Alimentos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Orquídea Profissional | Autoridade Técnica",
    description: "Plataforma de conteúdo técnico e catálogo profissional.",
    url: "https://orquideaprofissional.com.br",
    siteName: "Orquídea Profissional",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orquídea Profissional",
    description: "Conteúdo técnico e catálogo profissional.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Orquídea Prof",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <a href="#main-content" className="skip-link absolute left-[-9999px] top-0 focus:left-0 focus:top-0 bg-white text-black p-2 z-50" aria-label="Skip to main content">Pular para o conteúdo</a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
