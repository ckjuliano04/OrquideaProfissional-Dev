import { ProductSkeleton } from '@/components/ui/Skeleton';

export default function CatalogoLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse">
            <div className="h-4 w-24 bg-slate-200 rounded mb-6" />
            <div className="space-y-3">
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="h-8 bg-slate-50 rounded-lg ml-4" />
              <div className="h-8 bg-slate-50 rounded-lg ml-4" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          </div>
        </aside>

        {/* Grid Skeleton */}
        <main className="flex-grow">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-32 bg-slate-200 rounded" />
              <div className="h-8 w-48 bg-slate-200 rounded" />
            </div>
            <div className="w-full md:w-80 h-14 bg-white border border-slate-200 rounded-2xl animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
