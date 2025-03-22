import Image from "next/image";
import React from "react";
import { FaPen } from "react-icons/fa";
interface Employee {
  id: number;
  name: string;
  role: string;
  image: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "Paid" | "Pending";
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Senior Developer",
    image: "/images/emp9.jpg",
    basicSalary: 8500,
    allowances: 2500,
    deductions: 1800,
    netSalary: 9200,
    status: "Paid",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    image: "/images/emp5.jpg",
    basicSalary: 9800,
    allowances: 3000,
    deductions: 2100,
    netSalary: 10700,
    status: "Pending",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "UI/UX Designer",
    image: "/images/emp1.jpg",
    basicSalary: 7200,
    allowances: 2000,
    deductions: 1500,
    netSalary: 7700,
    status: "Paid",
  },
  {
    id: 4,
    name: "John Smith",
    role: "Software Engineer",
    image: "/images/emp2.jpg",
    basicSalary: 7800,
    allowances: 2200,
    deductions: 1700,
    netSalary: 8300,
    status: "Pending",
  },

  {
    id: 7,
    name: "Olivia Martinez",
    role: "Marketing Specialist",
    image: "/images/emp6.jpg",
    basicSalary: 6800,
    allowances: 1800,
    deductions: 1400,
    netSalary: 7200,
    status: "Paid",
  },
  {
    id: 9,
    name: "Ava Robinson",
    role: "Cybersecurity Analyst",
    image: "/images/emp8.jpg",
    basicSalary: 9500,
    allowances: 3200,
    deductions: 2900,
    netSalary: 9800,
    status: "Paid",
  }
];

const PayrollTable: React.FC = () => {
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
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-600 hover:bg-[#494e6b96]">
              <td className="p-3 flex items-center space-x-3">
                <div className="w-14 h-14 rounded-full mx-6 overflow-hidden relative">
                  <Image
                    src={employee.image}
                    alt={employee.name}
                    layout="fill"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
              </td>
              <td className="p-3 text-center">
                ${employee.basicSalary.toLocaleString()}
              </td>
              <td className="p-3 text-center">
                ${employee.allowances.toLocaleString()}
              </td>
              <td className="p-3 text-center">
                ${employee.deductions.toLocaleString()}
              </td>
              <td className="p-3 text-center font-semibold">
                ${employee.netSalary.toLocaleString()}
              </td>
              <td className="p-3 text-center">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    employee.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {employee.status}
                </span>
              </td>
              <td className="p-3 text-center space-x-4">
                <button className="text-white hover:text-gray-300">
                  <FaPen />
                </button>
                <button className="text-white hover:text-gray-300">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
