import React from "react";

const Payrollcomp = () => {
  return (
    <div className="bg-[#1D2135] w-[95%] border border-gray-500 rounded-xl h-[95%] py-12 px-8">
      <div className="w-[88%] rounded-lg h-14 bg-[#897eef32] flex justify-between items-center px-4 font-semibold">
        <p className="text-[#aea7f4]">Basic Salary</p>
        <p className="text-[#aea7f4]">₹ 1,02,000</p>
      </div>
      <div className="h-[90%] w-full flex">
        {/* border */}
        <div className="w-[60%] flex flex-col mt-8 gap-8">
          <div className="w-full font-semibold flex items-center px-4 rounded-lg h-14 bg-[#eb6b6b2f]">
            <p className="text-[#e68a8a]">Deductions</p>
          </div>
          <div className="w-[48%] font-semibold flex items-center px-4 rounded-lg h-14 bg-[#97ba8b39]">
            <p className="text-[#97ba8b]">Bounces</p>
          </div>
        </div>
        <div className="w-[40%]">
          {/* border */}
          <p className="text-lg font-semibold pt-6 text-right text-gray-400">Payment</p>
          <p className="text-2xl font-semibold pb-6 text-right">100%</p>
          <p className="text-lg font-semibold text-right text-gray-400">Gross Pay</p>
          <p className="text-2xl font-semibold text-right">₹ 1,22,000</p>
        </div>
      </div>
    </div>
  );
};

export default Payrollcomp;
