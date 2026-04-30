import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { createAuthToken } from "@/lib/auth-token";
import { getSessionCookie } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; password?: string };
  try {
    body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400 });
  }
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  if (name.length < 2 || !email.includes("@") || password.length < 6) {
    return NextResponse.json({ error: "Data registrasi tidak valid." }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email sudah digunakan." }, { status: 409 });
  }
  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true },
  });
  const token = createAuthToken(user.id);
  const res = NextResponse.json({ user });
  res.cookies.set(getSessionCookie(token));
  return res;
}
