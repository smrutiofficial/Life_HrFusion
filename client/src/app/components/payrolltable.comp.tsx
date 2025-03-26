"use client";

// import Image from "next/image";
import React from "react";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import Image from "next/image";

interface EPF {
  employeeContribution: number;
  employerContribution: number;
  uan: string;
}

interface Allowance {
  type: string;
  amount: number;
  _id: string;
}

interface Deduction {
  type: string;
  amount: number;
  _id: string;
}

interface PayrollData {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    role: "employee" | "admin" | "hr";
  };
  basicpay: number;
  bankac: string;
  ifsc: string;
  epf: EPF;
  allowances: Allowance[];
  deductions: Deduction[];
  ctc: number;
  updatedAt: string;
}

interface PayrollTableProps {
  userpayrole: PayrollData[];
  modclobtn: boolean;
  setModclobtn: React.Dispatch<React.SetStateAction<boolean>>;
}
// Function to calculate total allowances
const calculateTotalAllowances = (allowances: Allowance[]): number => {
  return allowances.reduce((total, allowance) => total + allowance.amount, 0);
};

// Function to calculate total deductions
const calculateTotalDeductions = (deductions: Deduction[]): number => {
  return deductions.reduce((total, deduction) => total + deduction.amount, 0);
};

// Function to calculate net salary
const calculateNetSalary = (
  basicpay: number,
  allowances: Allowance[],
  deductions: Deduction[]
): number => {
  const totalAllowances = calculateTotalAllowances(allowances);
  const totalDeductions = calculateTotalDeductions(deductions);
  return basicpay + totalAllowances - totalDeductions;
};

const PayrollTable: React.FC<PayrollTableProps> = ({
  userpayrole,
  modclobtn,
  setModclobtn,
}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <table className="w-full border-collapse rounded-lg bg-[#363b58a0] shadow-md">
        <thead className="bg-[#1D2135] text-gray-200">
          <tr>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3">Basic Salary</th>
            <th className="p-3">Allowances</th>
            <th className="p-3">Deductions</th>
            <th className="p-3">Net Salary</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userpayrole.map((employee) => {
            const totalAllowances = calculateTotalAllowances(
              employee.allowances
            );
            const totalDeductions = calculateTotalDeductions(
              employee.deductions
            );
            const netSalary = calculateNetSalary(
              employee.basicpay,
              employee.allowances,
              employee.deductions
            );

            return (
              <tr
                key={employee.userId._id}
                className="border-b border-gray-600 hover:bg-[#494e6b96]"
              >
                <td className="p-3 flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full mx-6 overflow-hidden relative">
                    <Image
                    src={employee.image || "/images/user.jpg"}
                    alt={employee.name || "alternative image"}
                    layout="fill"
                    className="w-full h-full rounded-full object-cover"
                  />
                  </div>
                  <div>
                    <p className="font-semibold">{employee.userId.name}</p>
                    <p className="text-sm text-gray-500">
                      {employee.userId.role}
                    </p>
                  </div>
                </td>
                <td className="p-3 text-center">
                  ₹{employee.basicpay.toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  ₹{totalAllowances.toLocaleString()}
                </td>
                <td className="p-3 text-center text-red-300">
                  ₹{totalDeductions.toLocaleString()}
                </td>
                <td className="p-3 text-center font-semibold text-green-200">
                  ₹{netSalary.toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 text-sm rounded-md capitalize ${
                      employee.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-4">
                  <button
                    onClick={() => {
                      setModclobtn(true);
                      router.push(`/payroll?id=${employee.userId._id}`);
                    }}
                    className="text-white hover:text-gray-300 cursor-pointer"
                  >
                    <FaPen />
                  </button>
                  <button className="text-white hover:text-gray-300">⋮</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
