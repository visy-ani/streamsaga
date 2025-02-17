"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const BrowsePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/auth/login" });
    } catch (err) {
      setError("Failed to sign out. Please try again." + err);
    }
  };

  const userInfo = useMemo(() => session?.user, [session]);

  return (
    <div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : userInfo ? (
        <div>
          <h1>
            Welcome, {userInfo.name || userInfo.email}
          </h1>
          <button
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default BrowsePage;
