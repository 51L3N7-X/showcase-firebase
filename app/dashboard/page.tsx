"use client";

import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h1>Welcome to the Dashboard, {session!.user?.name}</h1>
        <p>Your token : ${session?.accessToken}</p>
      </div>
    );
  }
}
