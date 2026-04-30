import QuizRunner from "@/components/quiz/QuizRunner";
import { requireAuthPage } from "@/lib/require-auth-page";

export default async function TesPage() {
  await requireAuthPage();
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-lime-700">
          Lembar soal
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Pilih satu jawaban per soal. Gunakan tombol navigasi di bawah kartu
          soal.
        </p>
      </div>
      <QuizRunner />
    </main>
  );
}
