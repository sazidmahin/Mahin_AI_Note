export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <div className="mb-10 flex flex-col items-center">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-border" />
        <div className="mt-3 h-5 w-72 animate-pulse rounded-lg bg-border" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="h-6 w-3/4 animate-pulse rounded bg-border" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-border" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-border" />
            </div>
            <div className="mt-4 flex gap-3">
              <div className="h-4 w-20 animate-pulse rounded bg-border" />
              <div className="h-4 w-16 animate-pulse rounded bg-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
