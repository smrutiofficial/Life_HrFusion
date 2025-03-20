import React from "react";

const Notificationcomp = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <p className="text-2xl font-semibold ">Notification</p>
        <button className="relative inline-flex h-12 overflow-hidden rounded-xl p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-sm backdrop-blur-3xl font-semibold text-gray-200 text-[16px]">
          Send Notification
        </span>
      </button>
      </div>



      <div className="w-[25%] flex flex-col justify-center items-center pl-4">
        <div className="flex gap-2 justify-center items-center mt-2">
          <p className="text-center font-semibold text-lg text-gray-300">
            Inbox
          </p>
          <div className="w-5 h-5 bg-[#EB6B6B] rounded-xs flex justify-center items-center">
            5
          </div>
        </div>
        <div className="w-full h-[0.05rem] bg-gray-300 mt-2"></div>
      </div>
      <div className="py-4 px-4 flex flex-col gap-5">
        {/* -------------- containts ---------------- */}
        <div className="bg-[#1D2135] border border-gray-500 w-full h-40 rounded-xl"></div>
        <div className="bg-[#1D2135] border border-gray-500 w-full h-80 rounded-xl"></div>
        <div className="bg-[#1D2135] border border-gray-500 w-full h-30 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Notificationcomp;
