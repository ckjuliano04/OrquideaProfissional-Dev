'use client';

// ─────────────────────────────────────────────
// Skeleton Base — Bloco animado de carregamento
// ─────────────────────────────────────────────
export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] ${className}`}
      {...props}
    />
  );
}

// ─────────────────────────────────────────────
// Card de Produto (Grid do Catálogo)
// ─────────────────────────────────────────────
export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      <div className="h-56 bg-slate-100 flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-2xl" />
      </div>
      <div className="p-8 space-y-4 bg-white">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-12 w-full rounded-2xl mt-4" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Detalhe do Produto (Ficha Técnica)
// ─────────────────────────────────────────────
export function ProductDetailSkeleton() {
  return (
    <div className="flex-grow bg-slate-50 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-4 mb-8">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Imagem */}
          <div className="w-full lg:w-1/2">
            <Skeleton className="aspect-square rounded-[3rem]" />
            <Skeleton className="h-16 w-64 rounded-full mt-10 mx-auto" />
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 space-y-6">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Skeleton className="h-24 rounded-3xl" />
              <Skeleton className="h-24 rounded-3xl" />
            </div>

            <Skeleton className="h-[400px] w-full rounded-[2.5rem] mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Card de Treinamento
// ─────────────────────────────────────────────
export function TrainingSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col">
      <Skeleton className="w-14 h-14 rounded-2xl mb-6" />
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-6" />
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Detalhe do Treinamento
// ─────────────────────────────────────────────
export function TrainingDetailSkeleton() {
  return (
    <div className="flex-grow bg-slate-50 pb-20">
      <div className="bg-orquidea-tech py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-32 mb-6 bg-white/10" />
          <Skeleton className="h-12 w-2/3 mb-4 bg-white/10" />
          <Skeleton className="h-6 w-full max-w-xl bg-white/10" />
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3 space-y-6">
            <Skeleton className="aspect-video rounded-3xl" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="w-full lg:w-1/3 space-y-4">
            <Skeleton className="h-48 rounded-3xl" />
            <Skeleton className="h-48 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Página Genérica (Full Page)
// ─────────────────────────────────────────────
export function PageSkeleton() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orquidea-green border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium text-sm tracking-wide">Carregando...</p>
      </div>
    </div>
  );
}
