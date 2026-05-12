"use client";

import { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fetchAPI } from "@/services/api";
import { normalizeProductDetail } from "@/services/normalizers";
import { ProductSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  Info,
  Truck,
  Calendar,
  ShoppingBag,
  Edit3,
  ChevronRight,
  Scale,
  Clock,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DetailSkeleton = () => (
  <div className="container mx-auto px-4 py-32">
    <div className="flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 aspect-square bg-slate-100 rounded-[3rem] animate-pulse" />
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="h-6 w-32 bg-slate-100 rounded-full animate-pulse" />
        <div className="h-16 w-3/4 bg-slate-100 rounded-2xl animate-pulse" />
        <div className="h-24 w-full bg-slate-100 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
        <div className="h-96 bg-slate-100 rounded-[2.5rem] animate-pulse" />
      </div>
    </div>
  </div>
);

export default function ProductDetailClient({ slug }) {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetchAPI(`/products/portal/${slug}/`)
      .then((data) => {
        if (isMounted) {
          setProduct(normalizeProductDetail(data));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar produto:", err);
        if (isMounted) {
          setLoading(false);
          if (err.message?.includes("404") || err?.status === 404) {
            notFound();
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, authLoading, slug, router]);

  if (authLoading || loading) return <DetailSkeleton />;
  if (!product) return notFound();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-32">
      {/* Admin Quick Edit */}
      {isAdmin && (
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="fixed bottom-8 left-8 z-[100]"
        >
          <a
            href={`http://localhost:8000/admin/products/products/${product.id}/change/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-2xl border border-white/10 hover:bg-black transition-all hover:scale-105 group"
          >
            <Edit3
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="text-xs uppercase tracking-widest">
              Editar no CMS
            </span>
          </a>
        </motion.div>
      )}

      {/* Breadcrumb & Back Button */}
      <div className="bg-white border-b border-slate-100 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <button
              onClick={() => router.push("/catalogo")}
              className="hover:text-orquidea-green transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Catálogo
            </button>
            <ChevronRight size={12} className="text-slate-200" />
            <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">
              {product.name}
            </span>
          </div>

          <Badge variant="secondary">Exclusivo Parceiro</Badge>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start"
        >
          {/* Left Side: Product Visuals */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 lg:sticky lg:top-32"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-orquidea-green/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <Card className="bg-white rounded-[3.5rem] border-none shadow-xl overflow-hidden aspect-square flex items-center justify-center p-12 relative">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  src={product.image_url || "/images/placeholder_product.png"}
                  alt={product.name}
                  className="max-h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700"
                />
              </Card>
            </div>

            <motion.div whileHover={{ y: -5 }} className="mt-12">
              <Button
                variant="destructive"
                size="xl"
                className="w-full rounded-2xl py-8 shadow-2xl shadow-orquidea-red/20 group"
              >
                Onde Encontrar este Produto
                <ShoppingBag
                  size={20}
                  className="ml-3 group-hover:rotate-12 transition-transform"
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side: Product Content */}
          <div className="w-full lg:w-1/2">
            <motion.div variants={itemVariants} className="mb-12">
              <Badge variant="tech" className="mb-8">
                {product.category_name}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter font-serif">
                {product.name}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                {product.short_description}
              </p>
            </motion.div>

            {/* Logistics Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
            >
              <Card className="border-none bg-white shadow-md hover:shadow-xl transition-all rounded-3xl p-8 flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-orquidea-green group-hover:bg-orquidea-green group-hover:text-white transition-all">
                  <Scale size={24} />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Peso Líquido
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {product.weight_info || "N/A"}
                  </span>
                </div>
              </Card>
              <Card className="border-none bg-white shadow-md hover:shadow-xl transition-all rounded-3xl p-8 flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-orquidea-green group-hover:bg-orquidea-green group-hover:text-white transition-all">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Validade
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {product.shelf_life_info || "N/A"}
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Nutritional Info Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                  <Info size={16} className="text-orquidea-green" />
                  Informações Nutricionais
                </h2>
                {product.nutrition && (
                  <Badge variant="outline" className="text-[10px] opacity-60">
                    Padrão ANVISA
                  </Badge>
                )}
              </div>

              <AnimatePresence mode="wait">
                {product.nutrition_rows && product.nutrition_rows.length > 0 ? (
                  <Card
                    key="nutrition-table"
                    className="border-none shadow-2xl overflow-hidden rounded-[2.5rem] bg-white"
                  >
                    <div className="p-10 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Porções por embalagem
                        </p>
                        <p className="text-xl font-black text-slate-900">
                          {product.nutrition?.portions_per_package ||
                            "Consultar"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Medida Caseira
                        </p>
                        <p className="text-xl font-black text-slate-900">
                          {product.nutrition?.household_measure || "Consultar"}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                            <th className="px-10 py-6">Nutriente</th>
                            {product.nutrition?.column_count >= 1 && (
                              <th className="px-6 py-6 text-center">
                                {product.nutrition.col_1_label}
                              </th>
                            )}
                            {product.nutrition?.column_count >= 2 && (
                              <th className="px-6 py-6 text-center text-slate-900">
                                {product.nutrition.col_2_label}
                              </th>
                            )}
                            {product.nutrition?.column_count >= 3 && (
                              <th className="px-6 py-6 text-center text-orquidea-green">
                                %VD*
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {product.nutrition_rows.map((row, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 + idx * 0.05 }}
                              className="group hover:bg-orquidea-cream/10 transition-colors"
                            >
                              <td className="px-10 py-5 text-sm font-bold text-slate-700">
                                {row.label}
                              </td>
                              {product.nutrition?.column_count >= 1 && (
                                <td className="px-6 py-5 text-center text-sm text-slate-500 font-medium">
                                  {row.value_100g || "-"}
                                </td>
                              )}
                              {product.nutrition?.column_count >= 2 && (
                                <td className="px-6 py-5 text-center text-sm text-slate-900 font-black">
                                  {row.value_serving || "-"}
                                </td>
                              )}
                              {product.nutrition?.column_count >= 3 && (
                                <td className="px-6 py-5 text-center text-sm text-orquidea-green font-black">
                                  {row.vd_percentage || "-"}
                                </td>
                              )}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {product.nutrition?.footer_note && (
                      <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                        <p className="text-[11px] leading-relaxed text-slate-400 italic font-medium">
                          * {product.nutrition.footer_note}
                        </p>
                      </div>
                    )}
                  </Card>
                ) : (
                  <Card
                    key="nutrition-empty"
                    className="p-20 bg-white border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                      <Info size={32} />
                    </div>
                    <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
                      Tabela nutricional em processo de atualização
                    </p>
                  </Card>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Technical Description */}
            {product.full_description && (
              <motion.div
                variants={itemVariants}
                className="mt-20 pt-16 border-t border-slate-200"
              >
                <h3 className="text-2xl font-black text-slate-900 mb-8 font-serif">
                  Informações Complementares
                </h3>
                <div className="text-slate-600 leading-[1.8] text-lg font-medium space-y-6">
                  {product.full_description
                    .split("\n")
                    .map((para, i) => para && <p key={i}>{para}</p>)}
                </div>
              </motion.div>
            )}

            {/* Support Action */}
            <motion.div
              variants={itemVariants}
              className="mt-20 p-10 bg-orquidea-night rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orquidea-green/10 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex-grow text-center md:text-left relative z-10">
                <p className="text-orquidea-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                  Dúvida Técnica?
                </p>
                <h4 className="text-2xl font-black mb-2 tracking-tight">
                  Fale com um Especialista Orquídea
                </h4>
                <p className="text-white/50 text-sm">
                  Nossos técnicos estão prontos para auxiliar na sua receita.
                </p>
              </div>
              <Button
                variant="glass"
                className="relative z-10 group-hover:scale-105 transition-transform"
              >
                Entrar em Contato
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
