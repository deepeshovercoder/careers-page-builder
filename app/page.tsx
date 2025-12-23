import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Ambient background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-[#5139ed]/20 to-purple-200/40 blur-xl" />
        <div className="absolute -bottom-48 -right-24 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-emerald-100/40 to-sky-200/40 blur-3xl" />
      </div>

      {/* Main content - Vertically centered */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <div className="group relative rounded-3xl bg-white/20 backdrop-blur-3xl border border-[#5139ed]/20 shadow-2xl shadow-slate-200/40 hover:shadow-3xl hover:shadow-[#5139ed]/10 hover:border-[#5139ed]/80 transition-all duration-700 p-8 sm:p-14 lg:p-16">
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#5139ed]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Trust badge */}
            <div className="mb-6 flex items-center justify-center gap-3 relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-200/20 backdrop-blur-sm border border-emerald-200/40 shadow-lg shadow-emerald-200/30">
                <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-800/90">
                Used by 500+ recruiters
              </span>
            </div>

            {/* Hero content - Recruiter focused */}
            <div className="space-y-8 text-center relative z-10">
              <div className="space-y-6">
                <h1 className="text-balance bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-800/95 bg-clip-text text-4xl font-light tracking-tight sm:text-4xl md:text-5xl lg:text-7xl drop-shadow-lg">
                  Branded careers pages in&nbsp;
                  <span className="font-bold bg-gradient-to-r from-[#5139ed] via-[#5a40f3] to-[#6742f6] bg-clip-text text-transparent drop-shadow-2xl">
                    5 minutes
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-balance text-md md:text-lg text-slate-800/90 leading-relaxed sm:text-xl">
                  Custom career pages for every role. <br /> No design. No Code.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center justify-center sm:flex-row">
                <Link
                  href="/login"
                  className="group relative inline-flex items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-r from-[#5139ed] via-[#5a40f3] to-[#6742f6] md:px-10 md:py-5 md:text-lg text-sm px-5 py-2 font-semibold text-white shadow-2xl shadow-[#5139ed]/40 backdrop-blur-md border border-white/30 hover:shadow-3xl hover:shadow-[#5139ed]/60 hover:-translate-y-1 hover:border-[#5139ed]/40 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-[#5139ed]/30"
                >
                  <span>Create First Page</span>
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Recruiter metrics */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-700/90 gap-5 md:gap-10 relative z-10">
                {/* 5 min setup */}
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm border border-white/50 shadow-lg shadow-indigo-200/40 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-300">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">5 min setup</span>
                </div>

                {/* 20+ templates */}
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm border border-white/50 shadow-lg shadow-emerald-200/40 hover:shadow-xl hover:shadow-emerald-300/50 transition-all duration-300">
                    <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">20+ templates</span>
                </div>

                {/* ATS friendly */}
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm border border-white/50 shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-300">
                    <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/30">ATS friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
