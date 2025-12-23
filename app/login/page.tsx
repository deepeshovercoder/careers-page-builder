'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // Check initial session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
        router.refresh();
      }
    };
    checkSession();

    // Listen for auth changes (SIGNED_IN, TOKEN_REFRESHED, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || session) {
        router.push('/dashboard');
        router.refresh(); // Forces server components to revalidate with new session
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Enhanced ambient background - matching homepage glass */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-[#5139ed]/30 to-purple-300/50 blur-3xl" />
        <div className="absolute -bottom-48 -right-24 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-emerald-200/50 to-sky-200/50 blur-3xl" />
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#5139ed]/20 blur-2xl" />
      </div>

      {/* Main content - Perfectly centered */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Enhanced Glass Card - Darker & More Visible */}
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-[40px] border border-[#5139ed]/20 shadow-3xl shadow-black/10 hover:shadow-4xl hover:shadow-[#5139ed]/20 hover:border-[#5139ed]/40 transition-all duration-1000 p-8 sm:p-10">
            
            {/* Multi-layer glass effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#5139ed]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

            {/* Header - Glass styled */}
            <div className="text-center mb-10 relative z-20">
              <h1 className="text-bold text-3xl tracking-tight sm:text-4xl drop-shadow-2xl">
                Welcome Back
              </h1>
              <p className="mt-3 text-gray-700 text-lg">
                Sign in to your recruiter account
              </p>
            </div>

            {/* Auth UI */}
            <div className="relative z-20">
              <Auth
  supabaseClient={supabase}
  appearance={{
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: '#5139ed',
          brandAccent: '#5139ed',
        },
        radii: {
          inputBorderRadius: '16px',
          buttonBorderRadius: '16px',
        },
      },
    },
  }}
  providers={[]}
  redirectTo="/dashboard"
/>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}