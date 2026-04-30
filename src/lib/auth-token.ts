import { createHmac, timingSafeEqual } from "crypto";
import { SESSION_MAX_AGE } from "@/lib/auth-constants";

type AuthToken = { userId: string; exp: number };

function getSecret(): string {
  const value = process.env.AUTH_SECRET ?? "";
  if (value.length < 16) {
    throw new Error("AUTH_SECRET minimal 16 karakter.");
  }
  return value;
}

function sign(raw: string): string {
  return createHmac("sha256", getSecret()).update(raw).digest("base64url");
}

export function createAuthToken(userId: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const body = Buffer.from(JSON.stringify({ userId, exp }), "utf-8");
  const payload = body.toString("base64url");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function parseAuthToken(token: string): AuthToken | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;
  const parsed = JSON.parse(
    Buffer.from(payload, "base64url").toString("utf-8"),
  ) as AuthToken;
  if (!parsed.userId || typeof parsed.exp !== "number") return null;
  if (parsed.exp <= Math.floor(Date.now() / 1000)) return null;
  return parsed;
}
