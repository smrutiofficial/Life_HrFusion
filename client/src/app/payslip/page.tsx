"use client";
import React, { useEffect, useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import EmployeeDetailsCard from "../components/payslip/empolyee_card.comp";
import SalaryChart from "../components/payslip/graph.comp";
import Deductions from "../components/payslip/deductions.comp";
import axios from "axios";
import { backend_link } from "../constants/constant";
import Alowances from "../components/payslip/allowance.comp";
import SalarySummary from "../components/payslip/salrysumary.comp";

type Allowance = {
  type: string;
  amount: number;
  _id: string;
};

type Deduction = {
  type: string;
  amount: number;
  _id: string;
};

type Payroll = {
  _id: string;
  basicpay: number;
  bankac: string;
  ifsc: string;
  allowances: Allowance[];
  deductions: Deduction[];
  ctc: number;
};

type User = {
  _id: string;
  hrmsId: number;
  username: string;
  name: string;
  email: string;
  role: string;
};

type UserData = {
  _id: string;
  userId: User;
  position: string;
  status: string;
  department: string;
  joinedDate: string;
  contactNumber: string;
  experience: number;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  aadharCard: string;
  panCard: string;
  createdAt: string;
  updatedAt: string;
  payroll: Payroll;
};

const Payslip = () => {
  // /payroll/role/all
  const [userData, setUserData] = useState<UserData | null>(null);
  const [netSalary, setNetSalary] = useState<number | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(`${backend_link}/payroll/cuser`, {
          headers: {
            token: `${token}`, // Attach token in Authorization header
          },
        });
        setUserData(response.data); // Set user data
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

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
              {userData && <EmployeeDetailsCard info={userData} />}
            </div>
            <div className=" rounded-xl w-[30%] h-fit bg-[#1D2135]">
              {/* comp 2 */}
              <SalaryChart net={netSalary} />
            </div>
          </div>
          <div className="h-[45rem] w-full px-14 py-2 flex justify-between gap-4">
            <div className=" rounded-xl w-[70%] h-full flex flex-col gap-2.5">
              {/* comp 3 */}
              <div className="rounded-xl bg-[#1D2135] h-[55%]">
                {userData && <Alowances info={userData} />}
              </div>
              <div className="rounded-xl bg-[#1D2135] h-[55%]">
                {userData && <Deductions info={userData} />}
              </div>
            </div>
            <div className=" rounded-xl w-[30%] h-full bg-[#1D2135]">
              {/* comp 4 */}
              {userData && <SalarySummary info={[userData]}  onNetSalaryChange={setNetSalary} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payslip;
