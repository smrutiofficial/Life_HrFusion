"use client"
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaDownload } from "react-icons/fa";
import axios from "axios";

  
const TaxSummary = ({ taxData }) => {
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIncomeTax = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/payroll/incometax", {
        basicPay: taxData?.basicPay || 0,
        allowances: taxData?.allowances || 0,
        deductions: taxData?.deductions || 0,
      });

      setTaxResult(response.data);
    } catch (error) {
      console.error("Error fetching income tax:", error);
    }
    setLoading(false);
  };


  const data = taxResult
    ? [
    { name: "Tax Payable", value: 19200, color: "#6e7393" },
    { name: "Total Deductions", value: 24000, color: "#ff9898" },
    { name: "Net Taxable", value: 96000, color: "#897EEF" },
  ]
  : [];
const renderLabel = ({ name }) => name;



  return (
    <div className="bg-[#1D2135] py-10 px-12 rounded-lg w-full text-white">
      <h2 className="text-lg font-semibold mb-4">Tax Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Annual Income</span>
          <span className="font-semibold text-sm">₹ {taxData?.basicPay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Total Deductions</span>
          <span className="text-sm text-gray-400">₹ {taxData?.deductions}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="text-gray-400 text-sm">Total Allowances</span>
          <span className="text-sm  text-gray-400">₹ {taxData?.allowances}</span>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between text-lg pb-2">
          <span className="text-gray-400 text-sm">Gross Income</span>
          <span className="text-gray-400 text-sm">₹ {taxResult?.grossIncome}</span>
        </div>
        <div className="flex justify-between text-lg pb-2">
          <span className="text-gray-400 text-sm">Standand Deduction</span>
          <span className="text-red-300 text-sm">- ₹ 75000</span>
        </div>
        <div className="flex justify-between text-lg pb-2">
          <span className="text-gray-400 text-sm">Taxable Income</span>
          <span className="text-gray-400 text-sm">₹ {taxResult?.taxableIncome}</span>
        </div>
        <div className="flex justify-between text-lg pb-2">
          <span className="text-gray-400 text-sm">Tax Amount</span>
          <span className="text-gray-400 text-sm">₹ {taxResult?.taxAmount}</span>
        </div>
        <div className="flex justify-between text-lg pb-2">
          <span className="text-gray-400 text-sm">cess</span>
          <span className="text-gray-400 text-sm">₹ {taxResult?.cess}</span>
        </div>
        <div className="flex justify-between text-lg pb-2">
          <span className="text-gray-400 text-sm">Final Tax</span>
          <span className="font-bold">₹ {taxResult?.finalTax}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Rebate under Section 87A</span>
          <span>₹ 0</span>
        </div>
      </div>
      <div className="mt-8">
        <button className="w-full bg-[#897EEF] text-white py-4 mb-1 rounded-lg hover:bg-[#9b93e0]"
        onClick={fetchIncomeTax}
        disabled={loading}
        >
        {loading ? "Calculating..." : "Calculate Tax"}
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
