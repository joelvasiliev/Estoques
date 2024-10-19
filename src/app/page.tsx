"use client";

import { WelcomeSection } from "@/sections/WelcomeSection";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated") {
      router.push('/painel');
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <WelcomeSection />;
};

export default Home;
