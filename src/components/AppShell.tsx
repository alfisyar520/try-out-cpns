import AppNav from "@/components/AppNav";
import AuthStatus from "@/components/AuthStatus";

type Props = { children: React.ReactNode };

export default async function AppShell({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      <header className="border-b border-slate-800 bg-slate-900 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-lime-500 text-xs font-black leading-tight text-slate-900"
              aria-hidden
            >
              CAT
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Simulasi mandiri
              </p>
              <p className="text-lg font-bold tracking-tight">Try Out CPNS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AppNav />
            <AuthStatus />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p className="mx-auto max-w-2xl leading-relaxed">
          Bukan aplikasi resmi BKN. Soal untuk latihan mandiri; hasil tidak
          dipakai untuk seleksi ASN.
        </p>
      </footer>
    </div>
  );
}
