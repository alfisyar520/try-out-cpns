import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/category-meta";

type Props = { limit: number };

const badge =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg " +
  "border border-lime-200 bg-lime-50 text-sm font-black text-slate-900";

const card =
  "group flex h-full flex-col rounded-xl border border-slate-200 bg-white " +
  "p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-lime-400 " +
  "hover:shadow-md focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-lime-500";

export default function CategoryCards({ limit }: Props) {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {CATEGORY_LIST.map((category) => (
        <li key={category.id}>
          <Link
            href={`/tes?category=${category.id}&limit=${limit}`}
            className={card}
          >
            <div className="flex items-start gap-4">
              <span className={badge} aria-hidden>
                {category.title}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-lime-700">
                  {category.subtitle}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  Try out {category.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {category.description}
                </p>
              </div>
            </div>
            <span className="mt-4 text-sm font-bold text-[#0a1628] group-hover:underline">
              Mulai tes →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
