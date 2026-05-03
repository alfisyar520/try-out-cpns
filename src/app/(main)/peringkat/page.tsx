import PaketLeaderboardClient from "@/components/PaketLeaderboardClient";
import { requireAuthPage } from "@/lib/require-auth-page";

export default async function PeringkatPage() {
  await requireAuthPage();
  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-600">
        <span className="font-medium text-slate-500">Beranda</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Peringkat paket</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Peringkat try out paket gabungan
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Perbandingan skor antar pengguna yang sudah menyelesaikan mode paket
          (satu set soal per varian).
        </p>
      </div>
      <PaketLeaderboardClient />
    </div>
  );
}
