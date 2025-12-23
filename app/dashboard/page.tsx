'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const [company, setCompany] = useState<any>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getCompany();
  }, []);

  async function getCompany() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setCompany(data);
    setLoading(false);
  }

  async function createCompany() {
    const { data: { user } } = await supabase.auth.getUser();
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const { data, error } = await supabase
      .from('companies')
      .insert({ name, slug, user_id: user?.id })
      .select()
      .single();

    if (!error) {
      setCompany(data);
    } else {
      alert('Error: ' + error.message);
    }
  }

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-[40px] border border-white/20 shadow-3xl shadow-black/10 p-12 text-center">
            <div className="inline-flex items-center gap-3 text-white/90">
              <div className="h-8 w-8 border-2 border-white/30 border-t-[#5139ed]/80 rounded-full animate-spin" />
              <span className="text-lg font-medium">Loading your dashboard...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-[#5139ed]/30 to-purple-300/50 blur-3xl" />
        <div className="absolute -bottom-48 -right-24 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-emerald-200/50 to-sky-200/50 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-[40px] border border-[#5139ed]/20 shadow-3xl shadow-black/10 hover:shadow-4xl hover:shadow-[#5139ed]/20 hover:border-[#5139ed]/80 transition-all duration-1000 p-10 lg:p-16">
            
            {/* Multi-layer glass */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#5139ed]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

            {/* Header */}
            <div className="text-center mb-6 md:mb-12 relative z-20">
              <h1 className="text-2xl md:text-4xl text-bold tracking-tight drop-shadow-2xl mb-4">
                Recruiter Dashboard
              </h1>
            </div>

            <div className="relative z-20">
              {company ? (
                /* Company Created State */
                <div className="text-center space-y-8">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="bg-[#A4C0FC] rounded-2xl md:rounded-3xl border-1 border-gray-300 flex items-center justify-center p-2 md:p-3">
                 
                     <span className='text-2xl md:text-3xl'>👋</span>
                      </div>
                      <div>
                        <h2 className="text-md md:text-2xl font-semibold text-gray-800 mb-1">Welcome {company.name}</h2>
                        <p className="text-gray-600 text-xs md:text-sm text-start">Your careers page is ready!</p>
                      </div>
                    </div>

                  {/* Action Buttons */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* Edit Page */}
  <Link
    href={`/${company.slug}/edit`}
    className="group relative h-14 md:h-24 p-4 rounded-3xl
      bg-gradient-to-br from-indigo-500/90 to-indigo-600
      backdrop-blur-xl border border-white/20
      shadow-2xl shadow-indigo-500/40
      hover:shadow-3xl hover:shadow-indigo-500/60
      hover:-translate-y-1 hover:scale-[1.02]
      transition-all duration-500 overflow-hidden
      flex items-center justify-center gap-3 md:gap-2
      flex-row md:flex-col text-center"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <svg
      className="h-6 w-6 md:h-8 md:w-8 relative z-10
        text-indigo-100 group-hover:text-indigo-50
        transition-all duration-300 drop-shadow-lg"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>

    <h3 className="text-sm md:text-xl font-semibold text-white/95 relative z-10 drop-shadow-lg">
      Edit Page
    </h3>
  </Link>

  {/* Preview */}
  <Link
    href={`/${company.slug}/preview`}
    className="group relative h-14 md:h-24 p-4 rounded-3xl
      bg-gradient-to-br from-emerald-500/90 to-emerald-600
      backdrop-blur-xl border border-white/20
      shadow-2xl shadow-emerald-500/40
      hover:shadow-3xl hover:shadow-emerald-500/60
      hover:-translate-y-1 hover:scale-[1.02]
      transition-all duration-500 overflow-hidden
      flex items-center justify-center gap-3 md:gap-2
      flex-row md:flex-col text-center"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <svg
      className="h-6 w-6 md:h-8 md:w-8 relative z-10
        text-emerald-100 group-hover:text-emerald-50
        transition-all duration-300 drop-shadow-lg"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>

    <h3 className="text-sm md:text-xl font-semibold text-white/95 relative z-10 drop-shadow-lg">
      Preview
    </h3>
  </Link>

  {/* Public Link */}
  <Link
    href={`/${company.slug}/careers`}
    className="group relative h-14 md:h-24 p-4 rounded-3xl
      bg-gradient-to-br from-purple-500/90 to-purple-600
      backdrop-blur-xl border border-white/20
      shadow-2xl shadow-purple-500/40
      hover:shadow-3xl hover:shadow-purple-500/60
      hover:-translate-y-1 hover:scale-[1.02]
      transition-all duration-500 overflow-hidden
      flex items-center justify-center gap-3 md:gap-2
      flex-row md:flex-col text-center"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <svg
      className="h-6 w-6 md:h-8 md:w-8 relative z-10
        text-purple-100 group-hover:text-purple-50
        transition-all duration-300 drop-shadow-lg"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>

    <h3 className="text-sm md:text-xl font-semibold text-white/95 relative z-10 drop-shadow-lg">
      Public Link
    </h3>
  </Link>

</div>


                </div>
              ) : (
                /* Create Company State */
                <div className="text-center space-y-8">
                  <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/30 shadow-2xl shadow-[#5139ed]/20">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="h-16 w-16 bg-gradient-to-r from-[#5139ed]/30 to-purple-500/30 rounded-3xl border-2 border-[#5139ed]/50 flex items-center justify-center">
                        <svg className="h-8 w-8 text-[#5139ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white/95 mb-1">Get Started</h2>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your company name"
                        className="w-full px-6 py-5 text-lg font-medium text-white/95 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl shadow-[#5139ed]/20 focus:outline-none focus:border-[#5139ed]/50 focus:shadow-2xl focus:shadow-[#5139ed]/40 focus:bg-white/20 transition-all duration-500 placeholder-white/50"
                        aria-label="Company name"
                      />
                    </div>
                    
                    <button 
                      onClick={createCompany} 
                      disabled={!name.trim()}
                      className="group relative w-full px-8 py-6 rounded-3xl bg-gradient-to-r from-[#5139ed] via-[#5a40f3] to-[#6742f6] text-xl font-bold text-white shadow-3xl shadow-[#5139ed]/50 backdrop-blur-xl border border-white/30 hover:shadow-4xl hover:shadow-[#5139ed]/70 hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg transition-all duration-500 overflow-hidden"
                    >
                      <span className="relative z-10">Create Company</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
