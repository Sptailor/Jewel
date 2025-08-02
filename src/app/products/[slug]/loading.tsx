export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square animate-pulse rounded-lg bg-neutral-200"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-md bg-neutral-200"></div>
            ))}
          </div>
        </div>
        
        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-5 w-1/3 animate-pulse rounded bg-neutral-200"></div>
          </div>
          
          <div className="h-10 w-1/3 animate-pulse rounded bg-neutral-200"></div>
          
          <div className="space-y-3">
            <div className="h-4 w-20 animate-pulse rounded bg-neutral-200"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 w-20 animate-pulse rounded bg-neutral-200"></div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="h-12 flex-1 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-12 w-12 animate-pulse rounded bg-neutral-200"></div>
          </div>
          
          <div className="h-40 animate-pulse rounded bg-neutral-200"></div>
        </div>
      </div>
    </div>
  );
}