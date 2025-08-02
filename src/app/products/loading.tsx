export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-9 w-48 animate-pulse rounded bg-neutral-200"></div>
        <div className="h-10 w-40 animate-pulse rounded bg-neutral-200"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square rounded-lg bg-neutral-200"></div>
            <div className="mt-3 space-y-2">
              <div className="h-4 w-20 rounded bg-neutral-200"></div>
              <div className="h-5 w-full rounded bg-neutral-200"></div>
              <div className="h-4 w-24 rounded bg-neutral-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}