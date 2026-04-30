import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-session";

export async function requireApiUser() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: "Login diperlukan." },
      { status: 401 },
    );
  }
  return user;
}
