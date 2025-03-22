"use client";
import React from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import EmployeeDetailsCard from "../components/payslip/empolyee_card.comp";
import SalaryChart from "../components/payslip/graph.comp";
import Deductions from "../components/payslip/deductions.comp";

const Payslip = () => {
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
            <p className="">My_Payslip</p>
          </div>
        </div>
        {/* ---------------------------------------------- */}
        <div className="h-full w-full mt-6">
          <div className="h-[36.2rem] w-full px-14 py-2 flex justify-between gap-4">
            <div className=" rounded-xl w-[70%] h-full bg-[#1D2135] flex flex-col">
              {/* comp 1 */}
              <EmployeeDetailsCard />
            </div>
            <div className=" rounded-xl w-[30%] h-fit bg-[#1D2135]">
              {/* comp 2 */}
              <SalaryChart />
            </div>
          </div>
          <div className="h-[45rem] w-full px-14 py-2 flex justify-between gap-4">
            <div className=" rounded-xl w-[70%] h-full flex flex-col gap-2.5">
              {/* comp 3 */}
              <div className="rounded-xl h-[45%] flex flex-wrap gap-4 justify-between">
                <div className="w-[38.5rem] flex flex-col justify-center px-22 gap-1 rounded-xl h-37 bg-[#1D2135]">
                  <p className="text-gray-400">Basic Salary</p>
                  <p className="text-2xl text-gray-300 font-semibold">$5000.00</p>
                  <p className="text-gray-400">60% of total</p>
                </div>
                <div className="w-[38.5rem] flex flex-col justify-center px-22 gap-1 rounded-xl h-37 bg-[#1D2135]">
                  <p className="text-gray-400">House Rest Allowance</p>
                  <p className="text-2xl text-gray-300 font-semibold">$2000.00</p>
                  <p className="text-gray-400">24% of Total</p>
                </div>
                <div className="w-[38.5rem] flex flex-col justify-center px-22 gap-1 rounded-xl h-37 bg-[#1D2135]">
                  <p className="text-gray-400">Conveyance Allowance</p>
                  <p className="text-2xl text-gray-300 font-semibold">$800.00</p>
                  <p className="text-gray-400">9% of total</p>
                </div>
              </div>
              <div className="rounded-xl bg-[#1D2135] h-[55%]">
              <Deductions/>
              </div>
            </div>
            <div className=" rounded-xl w-[30%] h-full bg-[#1D2135]">
              {/* comp 4 */}
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payslip;
