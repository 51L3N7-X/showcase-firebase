"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, [session, router]);

  if (session) {
    return (
      <div>
        <h1>Welcome to the Dashboard, {session.user?.name}</h1>
      </div>
    );
  }
  if (!session) {
    return <p>Not logged in</p>;
  }
}
