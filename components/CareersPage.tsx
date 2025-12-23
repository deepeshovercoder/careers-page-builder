"use client";

import type { CSSProperties } from "react";
import { Company, Job } from "@/types";
import JobList from "./JobList";

interface Props {
  company: Company;
  jobs: Job[];
  isPreview?: boolean;
}

export default function CareersPage({
  company,
  jobs,
  isPreview = false,
}: Props) {
  const { theme, sections } = company;
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const styleVars = {
    "--primary-color": theme.primaryColor || "#5139ed",
    "--secondary-color": theme.secondaryColor || "#6366f1",
  } as CSSProperties;

  return (
    <div style={styleVars} className="min-h-screen bg-slate-50">
      {/* Banner section with image card */}
      <header className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            {/* Text + logo */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                {theme.logoUrl && (
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={theme.logoUrl}
                      alt={`${company.name} logo`}
                      className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                    Careers at {company.name}
                  </h1>
                  <p className="mt-1 text-sm sm:text-base text-slate-600">
                    Join the team building what&apos;s next.
                  </p>
                </div>
              </div>

              <p className="max-w-xl text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                Explore open roles, learn about how we work, and find the
                opportunity that fits you best.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#jobs"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--primary-color)] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[var(--primary-color)]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  View open roles
                </a>
                <span className="text-xs sm:text-sm text-slate-500">
                  {jobs.length > 0
                    ? `${jobs.length} roles available`
                    : "No open roles right now"}
                </span>
              </div>
            </div>

            {/* Banner image card */}
            <div className="relative">
              <div className="rounded-3xl bg-slate-900/90 shadow-2xl shadow-slate-900/40 overflow-hidden border border-white/10">
                {theme.bannerUrl ? (
                  <img
                    src={theme.bannerUrl}
                    alt={`${company.name} team`}
                    className="h-52 sm:h-64 w-full object-cover opacity-90"
                  />
                ) : (
                  <div className="h-52 sm:h-64 w-full bg-gradient-to-br from-[var(--primary-color)] via-indigo-500 to-sky-400" />
                )}
                <div className="absolute inset-0" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-100">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Growing, remote-friendly team
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                    Inclusive, flexible, impact-driven
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* Optional video */}
        {theme.videoUrl && (
          <section className="mt-8 sm:mt-10">
            <div className="rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 border border-slate-200/60 bg-white">
              {/* MP4 / direct video */}
              {theme.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  src={theme.videoUrl}
                  controls
                  className="w-full h-[200px] md:h-[400px] object-cover"
                  aria-label="Company culture video"
                />
              ) : (
                /* YouTube / Loom / Vimeo */
                <iframe
                  src={theme.videoUrl
                    .replace("watch?v=", "embed/")
                    .replace("youtu.be/", "youtube.com/embed/")}
                  className="w-full h-[200px] md:h-[400px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </section>
        )}

        {/* Story sections */}
        {sortedSections.length > 0 && (
          <section className="mt-10 space-y-10">
            {sortedSections.map((section) => (
              <article key={section.id}>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
                  {section.title}
                </h3>
                <div
                  className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </article>
            ))}
          </section>
        )}

        {/* Jobs */}
        <section id="jobs" className="mt-12 sm:mt-14">
          <JobList jobs={jobs} />
        </section>
      </main>

      {isPreview && (
        <div className="fixed top-4 right-4 bg-amber-300 text-black px-4 py-2 rounded-full shadow-md text-xs sm:text-sm">
          Preview mode
        </div>
      )}
    </div>
  );
}
