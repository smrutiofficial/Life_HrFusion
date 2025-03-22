"use client"
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaDownload } from "react-icons/fa";

const data = [
    { name: "Tax Payable", value: 19200, color: "#6e7393" },
    { name: "Total Deductions", value: 24000, color: "#ff9898" },
    { name: "Net Taxable Income", value: 96000, color: "#897EEF" },
];
const renderLabel = ({ name }) => name;

const TaxSummary = () => {
  return (
    <div className="bg-[#1D2135] py-10 px-12 rounded-lg w-full text-white">
      <h2 className="text-lg font-semibold mb-4">Tax Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Gross Income</span>
          <span className="font-semibold">₹120,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Total Deductions</span>
          <span className="font-semibold">₹24,000</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="text-gray-400">Net Taxable Income</span>
          <span className="font-bold ">₹96,000</span>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between text-lg pb-2">
          <span>Tax Payable</span>
          <span className="font-bold">₹19,200</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Rebate under Section 87A</span>
          <span>₹0</span>
        </div>
      </div>
      <div className="mt-8">
        <button className="w-full bg-[#897EEF] text-white py-4 mb-1 rounded-lg hover:bg-[#9b93e0]">
          Calculate Tax
        </button>
      </div>
      <div className="mt-2">
        <button className="w-full flex items-center justify-center bg-[#363B58] py-4 rounded-lg hover:bg-[#404669] font-semibold">
          <span className="mr-2 "><FaDownload/></span> Download Report
        </button>
      </div>
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Tax Breakdown</h3>
        <div className="flex justify-center">
          <ResponsiveContainer width={400} height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                fill="#8884d8"
                label={renderLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;
