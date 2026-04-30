import HasilClient from "@/components/HasilClient";
import { requireAuthPage } from "@/lib/require-auth-page";

export default async function HasilPage() {
  await requireAuthPage();
  return (
    <div className="space-y-6">
      <div className="text-sm text-slate-600">
        <span className="font-medium text-slate-500">Beranda</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Nilai &amp; Hasil</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Ringkasan nilai try out
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Hasil sesi terakhir dari peramban ini (bukan data resmi BKN).
        </p>
      </div>
      <HasilClient />
    </div>
  );
}
