import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_link } from "../constants/constant";

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

const calculateTotalAllowances = (allowances: Allowance[]): number => {
  return allowances.reduce((total, allowance) => total + allowance.amount, 0);
};

const calculateTotalDeductions = (deductions: Deduction[]): number => {
  return deductions.reduce((total, deduction) => total + deduction.amount, 0);
};

const calculateNetSalary = (
  basicpay: number,
  allowances: Allowance[],
  deductions: Deduction[]
): number => {
  const totalAllowances = calculateTotalAllowances(allowances);
  const totalDeductions = calculateTotalDeductions(deductions);
  return basicpay + totalAllowances - totalDeductions;
};

const Payrollcomp = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in localStorage");
          setError("Unauthorized access. Please login.");
          return;
        }

        const response = await axios.get(`${backend_link}/payroll/cuser`, {
          headers: { token },
        });

        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load payroll data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!userData || !userData.payroll) {
    return <p className="text-center text-gray-400">No payroll data available.</p>;
  }

  const { basicpay, allowances, deductions } = userData.payroll;
  const totalAllowances = calculateTotalAllowances(allowances);
  const totalDeductions = calculateTotalDeductions(deductions);
  const netSalary = calculateNetSalary(basicpay, allowances, deductions);

  return (
    <div className="bg-[#1D2135] w-[95%] border border-gray-500 rounded-xl h-[95%] py-12 px-8">
      <div className="w-[88%] rounded-lg h-14 bg-[#897eef32] flex justify-between items-center px-4 font-semibold">
        <p className="text-[#aea7f4]">Basic Salary</p>
        <p className="text-[#aea7f4]">₹ {basicpay.toLocaleString()}</p>
      </div>
      <div className="h-[90%] w-full flex">
        {/* Left Section */}
        <div className="w-[60%] flex flex-col mt-8 gap-8">
          <div className="w-full font-semibold flex items-center px-4 rounded-lg h-14 bg-[#eb6b6b2f]">
            <p className="text-[#e68a8a] flex justify-between w-full">
              Deductions <span>₹ {totalDeductions.toLocaleString()}</span>
            </p>
          </div>
          <div className="w-[62%] font-semibold flex items-center px-4 rounded-lg h-14 bg-[#97ba8b39]">
            <p className="text-[#97ba8b] text-sm flex flex-col">
              Allowances <span>₹ {totalAllowances.toLocaleString()}</span>
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-[40%]">
          <p className="text-lg font-semibold pt-6 text-right text-gray-400">
            Payment
          </p>
          <p className="text-2xl font-semibold pb-6 text-right">100%</p>
          <p className="text-lg font-semibold text-right text-gray-400">
            Net Pay
          </p>
          <p className="text-2xl font-semibold text-right">
            ₹ {netSalary.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payrollcomp;
