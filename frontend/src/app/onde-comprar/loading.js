import Skeleton from '@/components/ui/Skeleton';

export default function OndeComprarLoading() {
  return (
    <div className="flex-grow flex flex-col bg-orquidea-cream/20">
      {/* Header Banner Skeleton */}
      <div className="bg-orquidea-green py-16">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="h-12 w-64 bg-white/10 rounded-xl mb-4" />
          <div className="h-6 w-96 bg-white/10 rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Filtros Skeleton */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-100">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-12 w-36 rounded-xl" />
            ))}
          </div>
          <Skeleton className="w-full lg:w-96 h-14 rounded-2xl" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col items-center">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-2 w-full mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
              <Skeleton className="h-14 w-full rounded-full" />
              <Skeleton className="h-14 w-full rounded-full mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
