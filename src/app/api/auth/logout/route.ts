import { NextResponse } from "next/server";
import { getLogoutCookie } from "@/lib/auth-session";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.set(getLogoutCookie());
  return res;
}
