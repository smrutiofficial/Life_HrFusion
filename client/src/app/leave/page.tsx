import React from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import LeaveSummary from "../components/leave/leavesummry.comp";
import LeaveRequestForm from "../components/leave/fileuploade.comp";
import RecentRequests from "../components/leave/recentreq.com";

const Leave = () => {
  return (
    <>
      <Bgcomp />
      <section className="w-[100%] h-[100%] overflow-scroll">
        <div className="flex items-end">
          <Logocomp />
          <div className="flex gap-3 pb-2">
            <Link href="/">
              <p className="text-gray-400">Dashboard</p>
            </Link>
            <p className="text-gray-400">&gt;</p>
            <p className="">Leave_Management</p>
          </div>
        </div>
        {/* --------------------------------------------- */}
        <div className="px-13 py-4">
          <LeaveSummary />
        </div>
        {/* ----------- */}
        <div className="w-full flex h-fit">
          <div className="w-[68.5%] px-13">
            <LeaveRequestForm/>
          </div>
          <div className="w-[31.5%] pr-4">
          <RecentRequests/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leave;
