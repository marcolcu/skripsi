"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Failed = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="text-center font-bold h-[100vh] flex items-center justify-center">
      Your payment failed. Redirecting you to home..
    </div>
  );
};

export default Failed;
