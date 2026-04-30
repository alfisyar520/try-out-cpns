import AppShell from "@/components/AppShell";
import { requireAuthPage } from "@/lib/require-auth-page";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthPage();
  return <AppShell>{children}</AppShell>;
}
