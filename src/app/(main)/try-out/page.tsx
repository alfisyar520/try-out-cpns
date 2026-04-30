import TryOutHub from "@/components/TryOutHub";
import { requireAuthPage } from "@/lib/require-auth-page";

export default async function TryOutPage() {
  await requireAuthPage();
  return <TryOutHub />;
}
