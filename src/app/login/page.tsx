import AuthForm from "@/components/AuthForm";
import { getSessionUser } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/");
  return (
    <main className="flex min-h-dvh items-center justify-center bg-lime-100 px-4 py-8">
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border-[12px] border-slate-900 bg-white shadow-2xl">
        <div className="grid min-h-[620px] md:grid-cols-[1.05fr_1fr]">
          <div className="relative hidden bg-gradient-to-b from-lime-200 to-lime-500 p-10 md:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,#ffffffaa,transparent_60%)]" />
            <div className="relative z-10 space-y-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-700">
                Simulasi CPNS
              </p>
              <h2 className="max-w-xs text-3xl font-bold leading-tight text-slate-800">
                Belajar konsisten, nilai makin siap.
              </h2>
              <div className="mt-10 rounded-3xl bg-white/75 p-6 backdrop-blur">
                <p className="text-sm font-semibold text-slate-700">
                  Sistem try out membantu latihan TWK, TIU, dan TKP lebih rapi.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-sm space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Create account
              </h1>
              <AuthForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
