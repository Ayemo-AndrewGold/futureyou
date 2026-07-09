export default function BlogLoading() {
  return (
    <div className="w-full">
      {/* Hero skeleton — mirrors the real hero's height so there's no layout jump */}
      <section className="relative w-full overflow-hidden bg-[#03070f]">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start gap-6 px-6 pb-12 pt-28 sm:px-10 sm:pb-16 sm:pt-36 lg:px-16 lg:pb-20">
          <div className="h-6 w-40 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 sm:h-16 w-full max-w-2xl rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-full max-w-md rounded-lg bg-white/10 animate-pulse" />
        </div>
      </section>

      {/* Content area — spinner + skeleton cards */}
      <section className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 mt-10 pb-24">
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <div className="w-9 h-9 border-[3px] border-[#293C97] border-t-transparent rounded-full animate-spin" />
          <p className="font-montserrat text-sm text-[#888]">
            Waking things up — this can take a moment on first load...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 overflow-hidden"
            >
              <div className="w-full h-44 bg-gray-100 animate-pulse" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse" />
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}