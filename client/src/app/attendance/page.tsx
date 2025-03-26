"use client";
import React, { useEffect, useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Image from "next/image";
import myself from "../../images/selfpngbg.jpg";
import AttendanceTrends from "../components/attendance/graph.comp";
import AttendanceSummary from "../components/attendance/summey.comp";
import { FaHistory } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import Link from "next/link";
import Preloader from "../components/preload.comp";

const Attendance = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);
  return (
<>
{loading ? (
        <Preloader />
      ) : (

        <>
        <Bgcomp />
        {/* ---------------------- */}
        <section className="w-[100%] h-full overflow-scroll">
        <div className="flex items-end">
            <Logocomp />
            <div className="flex gap-3 pb-2">
              <Link href="/">
                <p className="text-gray-400">Dashboard</p>
              </Link>
              <p className="text-gray-400">&gt;</p>
              <p className="">Atendance_tracking</p>
            </div>
          </div>
          <div className="h-[80%]">
            <div className="h-[30%] flex justify-between px-14 py-2 mt-4">
              {/* top layer */}
              <div className="w-[49.5%] h-full px-12 rounded-lg bg-[#1D2135]">
                {/* profile  */}
                <div className="relative flex items-center gap-6 text-white p-4 rounded-lg w-full h-full shadow-md">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0 w-30 h-30">
                    <Image
                      src={myself}
                      alt=""
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  {/* Employee Info */}
                  <div className="relative flex flex-col ml-4">
                    <h2 className="text-xl font-bold text-[#897EEF] pb-2">
                      Smruti Prakash Rout
                    </h2>
                    <p className="text-sm text-gray-400">Employee ID: 8967589</p>
                    <p className="text-sm text-gray-400">
                      Senior Product designer
                    </p>
                    <p className="text-sm text-gray-400">Design Team</p>
                  </div>
                </div>
              </div>
              <div className="w-[49.5%] h-full rounded-lg bg-[#1D2135]">
                <div className="relative flex flex-col py-10 px-30 text-white rounded-lg w-full h-full shadow-md">
                  <h2 className="text-2xl font-semibold">Today&apos;s Status</h2>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-sm text-gray-400">Check-in Time</p>
                      <p className="text-lg font-bold text-[#97BA8B]">09:00 AM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Check-out Time</p>
                      <p className="text-lg font-bold text-gray-300">--:-- PM</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        "Present" === "Present" ? "bg-[#97BA8B]" : "bg-red-400"
                      }`}
                    />
                    <span className="ml-2 text-sm">Present</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[70%] flex justify-between px-14 py-2">
              {/* bottom layer */}
              <div className="w-[49.5%] h-full rounded-lg bg-[#1D2135]">
                <AttendanceTrends />
              </div>
              <div className="w-[49.5%] h-full rounded-lg bg-[#1D2135]">
                <AttendanceSummary />
              </div>
            </div>
          </div>
          <div className="h-20 flex justify-end px-14 items-center gap-4">
            <div className="bg-[#1D2135] flex justify-center items-center gap-4 w-70 h-12">
              <FaDownload />
              <p>Download Report</p>
            </div>
            <div className="bg-[#363B58] flex justify-center items-center gap-4 w-70 h-12">
              <FaHistory />
              <p>View History</p>
            </div>
            <div className="bg-[#363B58] flex justify-center items-center gap-4 w-70 h-12">
              <BsCalendar2DateFill />
              <p>Request Leave</p>
            </div>
          </div>
        </section>
      </>
      )}
</>
  );
};

export default Attendance;
