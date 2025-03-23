"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Bgcomp from "./components/bg.comp";
import Logocomp from "./components/logo.comp";
import Dashboard from "./home/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login"); // Redirect if token is missing
    }
  }, [router]);

  return (
    <>
      <Bgcomp />
      <Logocomp />
      <Dashboard />
    </>
  );
}
