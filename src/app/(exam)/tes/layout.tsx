import ExamTopBar from "@/components/exam/ExamTopBar";
import { requireAuthPage } from "@/lib/require-auth-page";

export default async function ExamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthPage();
  return (
    <div className="min-h-dvh bg-slate-200">
      <ExamTopBar />
      <div className="pt-16">{children}</div>
    </div>
  );
}
