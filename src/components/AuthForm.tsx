"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Mode = "login" | "register";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setErr(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = (await res.json()) as { error?: string };
      setErr(body.error ?? "Autentikasi gagal.");
      setBusy(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  const tabBase =
    "min-h-11 rounded-xl px-4 text-sm font-semibold transition duration-200";
  const tabOn = "bg-lime-500 text-slate-900 shadow";
  const tabOff = "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-lime-50";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`${tabBase} ${mode === "login" ? tabOn : tabOff}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`${tabBase} ${mode === "register" ? tabOn : tabOff}`}
        >
          Register
        </button>
      </div>
      {mode === "register" && (
        <input
          name="name"
          placeholder="Nama"
          className="w-full rounded-xl border border-slate-200 px-3 py-3"
          required
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border border-slate-200 px-3 py-3"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-slate-200 px-3 py-3"
        minLength={6}
        required
      />
      {err && <p className="text-sm font-semibold text-red-700">{err}</p>}
      <button
        disabled={busy}
        className="w-full rounded-xl bg-lime-500 px-4 py-3 font-semibold text-slate-900 disabled:opacity-50"
        type="submit"
      >
        {busy ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
      </button>
    </form>
  );
}
