"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Search,
  MessageCircle,
  ChevronRight,
  Globe,
  Map,
  Store,
  Navigation,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import FlourParticles from "@/components/FlourParticles";
import { cn } from "@/lib/utils";

export default function OndeComprarPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeState, setActiveState] = useState("RS");
  const [searchQuery, setSearchQuery] = useState("");

  const allowedStates = [
    { uf: "RS", name: "Rio Grande do Sul" },
    { uf: "SC", name: "Santa Catarina" },
    { uf: "PR", name: "Paraná" },
    { uf: "SP", name: "São Paulo" },
  ];

  useEffect(() => {
    fetchAPI("/content/stores/")
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar lojas:", err);
        setLoading(false);
      });
  }, []);

  const filteredStores = stores.filter((store) => {
    const matchState =
      store.state?.trim().toUpperCase() === activeState.trim().toUpperCase();
    const matchSearch =
      store.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (store.city &&
        store.city.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchState && matchSearch;
  });

  const getMapLink = (store) => {
    if (store.latitude && store.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`;
    }
    if (store.address_text) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address_text)}`;
    }
    return null;
  };

  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, "");
    const finalPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
    return `https://api.whatsapp.com/send?phone=${finalPhone}`;
  };

  const formatPhone = (phone) => {
    if (!phone) return "Sem telefone";
    const clean = phone.replace(/\D/g, "");
    if (clean.length === 11) {
      return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
    } else if (clean.length === 10) {
      return `(${clean.substring(0, 2)}) ${clean.substring(2, 6)}-${clean.substring(6)}`;
    }
    return phone;
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-orquidea-night overflow-hidden">
        <FlourParticles opacity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-orquidea-night/50 to-orquidea-night z-0" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 font-serif tracking-tight">
              Onde <span className="text-orquidea-gold">Comprar</span>
            </h1>
            <p className="text-orquidea-cream/60 text-lg md:text-xl max-w-2xl mx-auto font-serif italic">
              Encontre nossos fornecedores e vendedores autorizados por região
              para garantir a melhor performance em sua produção.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-20 pb-32">
        {/* Filters and Search Bar Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-10 mb-16 flex flex-col lg:flex-row items-center gap-8">
          {/* State Tabs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 flex-grow">
            {allowedStates.map((state) => (
              <button
                key={state.uf}
                onClick={() => setActiveState(state.uf)}
                className={cn(
                  "px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap",
                  activeState === state.uf
                    ? "bg-orquidea-green text-white shadow-lg shadow-orquidea-green/20"
                    : "text-slate-500 hover:bg-slate-50 hover:text-orquidea-green",
                )}
              >
                {state.uf}{" "}
                <span className="hidden sm:inline opacity-40 ml-1">
                  | {state.name}
                </span>
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="w-full lg:w-[350px] relative">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Nome ou cidade..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orquidea-green/20 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400 text-sm"
            />
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white h-80 rounded-3xl animate-pulse border border-slate-100"
                />
              ))}
            </motion.div>
          ) : filteredStores.length === 0 ? (
            <motion.div
              key="empty"
              {...fadeIn}
              className="bg-white rounded-[3rem] border border-slate-100 p-20 text-center shadow-xl max-w-xl mx-auto"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                <Store size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 font-serif">
                Nenhum parceiro encontrado
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Tente ajustar sua busca para{" "}
                <span className="font-bold text-orquidea-green">
                  {activeState}
                </span>{" "}
                ou selecione outro estado.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveState("RS");
                }}
              >
                Ver todos os parceiros
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStores.map((store) => (
                <motion.div
                  key={store.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white">
                    <CardContent className="p-8 md:p-10 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-6">
                        <Badge
                          variant="tech"
                          className="px-3 py-1 rounded-lg flex items-center gap-2"
                        >
                          <MapPin size={12} />
                          {store.city}
                        </Badge>
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 mb-8 leading-tight font-serif flex-grow">
                        {store.title}
                      </h3>

                      <div className="space-y-5 mb-10">
                        <div className="flex items-start gap-4">
                          <Navigation
                            size={18}
                            className="text-orquidea-gold mt-1 flex-shrink-0"
                          />
                          <p className="text-sm font-bold text-slate-600 uppercase tracking-tight leading-snug">
                            {store.address_text || "Endereço sob consulta"}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Phone
                            size={18}
                            className="text-orquidea-gold flex-shrink-0"
                          />
                          <p className="text-sm font-bold text-slate-600">
                            {formatPhone(store.contact_info)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Mail
                            size={18}
                            className="text-orquidea-gold flex-shrink-0"
                          />
                          <p className="text-sm font-bold text-slate-600 truncate lowercase">
                            {store.email || "contato@parceiro.com"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 mt-auto">
                        {getMapLink(store) && (
                          <a
                            href={getMapLink(store)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-orquidea-green hover:bg-orquidea-night text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orquidea-green/20 transition-all duration-300"
                          >
                            Ver Localização
                            <ChevronRight size={16} />
                          </a>
                        )}

                        {getWhatsAppLink(store.contact_info) && (
                          <a
                            href={getWhatsAppLink(store.contact_info)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-100 transition-all duration-300"
                          >
                            <MessageCircle size={18} />
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
