import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/category-meta";

const quickLimit = 8;

const cardClass =
  "flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm " +
  "transition hover:border-lime-400 hover:shadow-md " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-lime-500";

const ctaClass =
  "mt-6 inline-flex min-h-11 items-center justify-center rounded-lg " +
  "bg-lime-500 px-5 text-sm font-bold text-slate-900 shadow-sm " +
  "transition hover:bg-lime-400 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-lime-600";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Selamat datang di dashboard try out
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Latih pola ujian CAT: pilih mapel SKD, atur jumlah soal, kerjakan
          dengan tenang, lalu cek ringkasan di menu &quot;Nilai &amp; Hasil&quot;.
        </p>
        <Link href="/try-out" className={ctaClass}>
          Menu try out lengkap →
        </Link>
      </div>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700">
          Mulai cepat ({quickLimit} soal)
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {CATEGORY_LIST.map((category) => (
            <li key={category.id}>
              <Link
                href={`/tes?category=${category.id}&limit=${quickLimit}`}
                className={cardClass}
              >
                <span className="text-xs font-bold text-lime-700">
                  Subtansi {category.title}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  {category.subtitle}
                </span>
                <span className="mt-3 text-sm font-bold text-slate-900">
                  Kerjakan sekarang
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
