"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/try-out", label: "Try Out" },
  { href: "/hasil", label: "Nilai & Hasil" },
] as const;

const base =
  "rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-lime-300";

const idle = "text-slate-200 hover:bg-white/10 hover:text-white";

const active = "bg-lime-500 text-slate-900 shadow-sm hover:bg-lime-400";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNav() {
  const pathname = usePathname();
  return (
    <nav
      className="flex flex-wrap items-center gap-1 border-t border-white/10 pt-3 sm:border-0 sm:pt-0"
      aria-label="Menu utama"
    >
      {links.map((link) => {
        const on = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${base} ${on ? active : idle}`}
            aria-current={on ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
