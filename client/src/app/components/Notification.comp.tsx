import React from "react";
import DashboardNotifications from "./notification/inbox.comp";
import Link from "next/link";

const Notificationcomp = () => {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-4">
        <p className="text-xl font-semibold ">Notification</p>
        <Link href="/notification">
        <button className="relative inline-flex h-10 overflow-hidden rounded-lg p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#] py-1 text-sm backdrop-blur-3xl font-semibold text-gray-200 px-4">
            Send Notification
          </span>
        </button>
        </Link>
        
      </div>
      <DashboardNotifications/>
    </div>
  );
};

export default Notificationcomp;
