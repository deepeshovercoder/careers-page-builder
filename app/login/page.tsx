"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // check initial session on mount
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
        router.refresh();
      }
    };
    checkSession();

    // listen for auth changes (SIGNED_IN, TOKEN_REFRESHED, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || session) {
        router.push("/dashboard");
        router.refresh(); // Forces server components to revalidate with new session
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-[#5139ed]/30 to-purple-300/50 blur-3xl" />
        <div className="absolute -bottom-48 -right-24 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-emerald-200/50 to-sky-200/50 blur-3xl" />
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#5139ed]/20 blur-2xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="group relative rounded-3xl bg-white/10 backdrop-blur-[40px] border border-[#5139ed]/20 shadow-3xl shadow-black/10 hover:shadow-4xl hover:shadow-[#5139ed]/20 hover:border-[#5139ed]/40 transition-all duration-1000 p-8 sm:p-10">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#5139ed]/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

            <div className="text-center mb-10 relative z-20">
              <h1 className="text-balance bg-gradient-to-r from-white via-slate-100 to-white/80 bg-clip-text text-3xl font-light tracking-tight sm:text-4xl drop-shadow-2xl">
                Welcome back
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
                        brand: "#5139ed",
                        brandAccent: "#452fd1",
                        inputBackground: "rgba(255, 255, 255, 0.15)",
                        inputBorder: "rgba(255, 255, 255, 0.2)",
                        inputBorderHover: "rgba(81, 57, 237, 0.3)",
                        inputBorderFocus: "#5139ed",
                        inputText: "#ffffff",
                        inputLabelText: "rgba(255, 255, 255, 0.9)",
                        messageText: "rgba(255, 255, 255, 0.8)",
                        defaultButtonBackground: "rgba(81, 57, 237, 0.95)",
                        defaultButtonBackgroundHover: "#452fd1",
                        defaultButtonBorder: "rgba(255, 255, 255, 0.2)",
                        defaultButtonText: "#ffffff",
                        anchorTextColor: "rgba(255, 255, 255, 0.95)",
                        anchorTextHoverColor: "#ffffff",
                        dividerBackground: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                  },
                  style: {
                    container: {
                      backgroundColor: "transparent",
                      borderRadius: "24px",
                      padding: "40px 0",
                      maxWidth: "400px",
                    },
                    input: {
                      backgroundColor: "transparent",
                      border: "1px solid transparent",
                      borderRadius: "14px",
                      padding: "20px",
                      fontSize: "16px",
                      color: "#ffffff",
                      fontWeight: "500",
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    button: {
                      borderRadius: "16px",
                      padding: "18px 28px",
                      fontSize: "16px",
                      fontWeight: "700",
                      letterSpacing: "0.025em",
                      background:
                        "linear-gradient(135deg, #5139ed 0%, #5a40f3 50%, #6742f6 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow:
                        "0 8px 32px rgba(81, 57, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    label: {
                      fontWeight: "600",
                      marginBottom: "12px",
                      color: "rgba(255, 255, 255, 0.95)",
                      fontSize: "15px",
                    },
                    anchor: {
                      color: "rgba(255, 255, 255, 0.95)",
                      fontWeight: "600",
                      fontSize: "14px",
                      borderRadius: "10px",
                      padding: "8px 16px",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      transition: "all 0.3s ease",
                    },
                    divider: {
                      background: "rgba(255, 255, 255, 0.15)",
                    },
                  },
                  className: {
                    input: `
        [&:focus]:outline-none
        [&:focus]:border-[#5139ed]
        [&:focus]:bg-white/20
        [&:focus]:shadow-[0_0_0_4px_rgba(81,57,237,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]
        [&:focus]:-translate-y-[1px]
        [&::placeholder]:text-white/50
      `,
                    button: `
        hover:-translate-y-[2px]
        hover:shadow-[0_12px_40px_rgba(81,57,237,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]
        active:translate-y-[-1px]
      `,
                    anchor: `
        hover:bg-[#5139ed]/20
        hover:border-[#5139ed]/40
        hover:-translate-y-[1px]
        hover:shadow-[0_4px_12px_rgba(81,57,237,0.3)]
      `,
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
