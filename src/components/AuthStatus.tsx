import Link from "next/link";
import UserAccountMenu from "@/components/UserAccountMenu";
import { getSessionUser } from "@/lib/auth-session";

const loginClass =
  "rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold " +
  "text-slate-100 transition hover:bg-white/10";

export default async function AuthStatus() {
  const user = await getSessionUser();
  if (!user) {
    return (
      <Link href="/login" className={loginClass}>
        Login
      </Link>
    );
  }
  return <UserAccountMenu name={user.name} email={user.email} />;
}
