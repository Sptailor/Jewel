export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-neutral-200" />
      <div className="mb-8 h-8 w-64 animate-pulse rounded bg-neutral-200" />
      <div className="rounded-lg border bg-white p-6">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="mb-2 h-4 w-24 animate-pulse rounded bg-neutral-200" />
                <div className="h-10 animate-pulse rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}