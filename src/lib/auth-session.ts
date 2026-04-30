import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth-constants";
import { parseAuthToken } from "@/lib/auth-token";
import { prisma } from "@/lib/prisma";

export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = parseAuthToken(token);
  if (!payload) return null;
  return prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true },
  });
}

export function getSessionCookie(token: string) {
  return {
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function getLogoutCookie() {
  return {
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}
