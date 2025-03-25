"use client"
import React, { useEffect, useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import NotificationUI from "../components/sendnoti/sendnoti.comp";
import Preloader from "../components/preload.comp";

const Notification = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    {loading ? <Preloader /> : 
    <>
      <Bgcomp />
      <section className="w-[100%] h-full overflow-scroll">
        <div className="flex items-end">
          <Logocomp />
          <div className="flex gap-3 pb-2">
            <Link href="/">
              <p className="text-gray-400">Dashboard</p>
            </Link>
            <p className="text-gray-400">&gt;</p>
            <p className="">Send_Notification</p>
          </div>
        </div>
        {/* ----------------------- */}
        <div className=" py-8 w-full flex justify-center">
          <NotificationUI />
        </div>
      </section>
    </>
    }
    </>
  );
};

export default Notification;
