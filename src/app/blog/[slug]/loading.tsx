export default function PostLoading() {
  return (
    <article className="max-w-[48rem] mx-auto px-6 py-20 sm:py-28">
      {/* Back link skeleton */}
      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mb-6" />

      {/* Title skeleton */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="h-9 sm:h-11 w-full bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-9 sm:h-11 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Meta row skeleton */}
      <div className="flex items-center gap-3 pb-7">
        <div className="w-[38px] h-[38px] rounded-full bg-gray-100 animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
          <div className="h-2.5 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>

      {/* Cover image skeleton */}
      <div className="w-full h-64 sm:h-[26rem] rounded-sm bg-gray-100 animate-pulse mb-10" />

      {/* Loading indicator */}
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        <div className="w-9 h-9 border-[3px] border-[#293C97] border-t-transparent rounded-full animate-spin" />
        <p className="font-montserrat text-sm text-[#888]">
          Waking things up — this can take a moment on first load...
        </p>
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-100 rounded animate-pulse"
            style={{ width: i % 3 === 2 ? "70%" : "100%" }}
          />
        ))}
      </div>
    </article>
  );
}