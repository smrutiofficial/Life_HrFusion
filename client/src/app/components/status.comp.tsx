import React from "react";

const Statuscomp = () => {
  return (
    <div className="w-[98%] rounded-xl h-[90%] border border-gray-500 bg-[#1D2135] flex justify-evenly items-center">
      <div className="h-[75%] w-[22%] flex flex-col items-center justify-evenly">
        <p className="text-[#897EEF] text-md">Total</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[20px] text-gray-300 font-me">265</p>
        </div>
      </div>

      <div className="h-[75%] w-[22%] flex flex-col items-center justify-evenly">
        <p className="text-[#E8C16D] text-md">Active</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[20px] text-gray-300 font-me">258</p>
        </div>
      </div>

      <div className="h-[75%] w-[22%] flex flex-col items-center justify-evenly">
        <p className="text-[#EB6B6B] text-md">Leave Today</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[20px] text-gray-300 font-me">07</p>
        </div>
      </div>

      <div className="h-[75%] w-[22%] flex flex-col items-center justify-evenly">
        <p className="text-[#97BA8B] text-md">New Hires</p>
        <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
          <p className="text-[20px] text-gray-300 font-me">12</p>
        </div>
      </div>
    </div>
  );
};

export default Statuscomp;
