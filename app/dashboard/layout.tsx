import { getServerSession } from "next-auth";

import SessionProvider from "@/components/SessionProvider";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
