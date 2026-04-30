import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { createAuthToken } from "@/lib/auth-token";
import { getSessionCookie } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400 });
  }
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password wajib." }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Email/password salah." }, { status: 401 });
  }
  const ok = await compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Email/password salah." }, { status: 401 });
  }
  const token = createAuthToken(user.id);
  const res = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
  res.cookies.set(getSessionCookie(token));
  return res;
}
