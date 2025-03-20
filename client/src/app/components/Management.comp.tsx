import Link from "next/link";
import React from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiDocumentText } from "react-icons/hi2";
import { FaClock } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

const Managementcomp = () => {
  return (
    <div className="bg-[#1D2135] border py-8 border-gray-500 w-full h-[95%] rounded-xl flex flex-col justify-center">
      <div className="w-full flex h-[34%] justify-evenly items-center">
        <Link
          href="/employee"
          className={`h-16 flex justify-center items-center rounded-xl w-[42%] border-[#897EEF] border-3 bg-[#363B58]`}
        >
          <div>
            <p className="text-lg font-semibold text-[#897EEF] flex flex-row  justify-center items-center gap-3"><HiMiniUserGroup/>Employee</p>
          </div>
        </Link>
        <Link
          href="/payroll"
          className={`h-16 flex justify-center items-center rounded-xl w-[42%] border-[#363B58] border-3 bg-[#363B58]`}
        >
          <div>
            <p className="text-lg font-semibold flex flex-row  justify-center items-center gap-3"><HiDocumentText/>Payroll</p>
          </div>
        </Link>
      </div>
      {/* ----------------------- */}
      <div className="w-full flex h-[34%] justify-evenly items-center">
        <Link
          href="/payslip"
          className={`h-16 flex justify-center items-center rounded-xl w-[42%] border-[#363B58] border-3 bg-[#363B58]`}
        >
          <div>
            <p className="text-lg font-semibold flex flex-row  justify-center items-center gap-3"><FaMoneyBillWave/>Pay slip</p>
          </div>
        </Link>
        <Link
          href="/incometax"
          className={`h-16 flex justify-center items-center rounded-xl w-[42%] border-[#E8C16D] border-3 bg-[#363B58]`}
        >
          <div>
            <p className="text-lg font-semibold text-[#E8C16D] flex flex-row  justify-center items-center gap-3"><FaCalculator/>Income Tax</p>
          </div>
        </Link>
      </div>
      {/* ---------------------- */}
      <div className="w-full flex h-[34%] justify-evenly items-center">
        <Link
          href="/attendance"
          className={`h-16 flex justify-center items-center rounded-xl w-[42%] border-[#EB6B6B] border-3 bg-[#363B58]`}
        >
          <div>
            <p className="text-lg font-semibold text-[#EB6B6B] flex flex-row  justify-center items-center gap-3"><FaClock/>Attendance</p>
          </div>
        </Link>
        <Link
          href="/leave"
          className={`h-16 flex justify-center items-center rounded-xl w-[42%] border-[#363B58] border-3 bg-[#363B58]`}
        >
          <div>
            <p className="text-lg font-semibold flex flex-row  justify-center items-center gap-3"><FaCalendar/>Leave</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Managementcomp;
