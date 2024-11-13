import { getServerSession } from "next-auth";

import SessionProvider from "@/components/SessionProvider";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  console.log("==================Session:", session);
  if (!session || !session.user) {
    redirect("/login");
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
