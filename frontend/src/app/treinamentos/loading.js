import { TrainingSkeleton } from '@/components/ui/Skeleton';

export default function TreinamentosLoading() {
  return (
    <div className="flex-grow bg-slate-50 pb-20">
      {/* Header Banner Skeleton */}
      <div className="bg-orquidea-tech text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 animate-pulse">
          <div className="h-12 w-64 bg-white/10 rounded-xl mb-4" />
          <div className="h-6 w-96 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <TrainingSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
