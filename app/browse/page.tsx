"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BrowsePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  return (
    <div>
      <h1>Browse Our Library</h1>
      <p>Welcome, {session?.user?.name || session?.user?.email}</p>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Log Out
      </button>
    </div>
  );
};

export default BrowsePage;
