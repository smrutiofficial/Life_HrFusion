import React from "react";

const Statuscomp = () => {
  return (
    <div className="w-[98%] rounded-2xl h-[90%] border border-gray-500 bg-[#1D2135] flex justify-evenly items-center">
      <div className="h-[75%] w-[22%] flex flex-col items-center justify-between">
        <p className="text-[#897EEF] text-[18px]">Total</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[24px]">265</p>
        </div>
      </div>

      <div className="h-[75%] w-[22%] flex flex-col items-center justify-between">
        <p className="text-[#E8C16D] text-[18px]">Active</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[24px]">258</p>
        </div>
      </div>

      <div className="h-[75%] w-[22%] flex flex-col items-center justify-between">
        <p className="text-[#EB6B6B] text-[18px]">Leave Today</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[24px]">07</p>
        </div>
      </div>

      <div className="h-[75%] w-[22%] flex flex-col items-center justify-between">
        <p className="text-[#97BA8B] text-[18px]">New Hires</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[24px]">12</p>
        </div>
      </div>
    </div>
  );
};

export default Statuscomp;
