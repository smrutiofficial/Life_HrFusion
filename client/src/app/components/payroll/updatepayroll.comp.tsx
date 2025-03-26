"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaTrash, FaPlus } from "react-icons/fa";
import { backend_link } from "@/app/constants/constant";

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

interface User {
  _id: string;
  name: string;
  email: string;
  role: "employee" | "admin" | "hr";
}

interface PayrollData {
  _id: string;
  userId: User;
  basicpay: number;
  bankac: string;
  ifsc: string;
  epf: EPF;
  allowances: Allowance[];
  deductions: Deduction[];
  ctc: number;
  updatedAt: string;
}

const PayrollPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [payroll, setPayroll] = useState<PayrollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🔹 Fetch Payroll Data
  useEffect(() => {
    if (!userId) return;

    const fetchPayroll = async () => {
      try {
        const response = await axios.get(`${backend_link}/payroll/${userId}`);
        setPayroll(response.data);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, [userId]);

  // 🔹 Handle Input Changes
  const handleInputChange = (field: keyof PayrollData, value: any) => {
    setPayroll((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // 🔹 Handle Add Item (Allowance / Deduction)
  const addItem = (type: "allowance" | "deduction") => {
    setPayroll((prev) => {
      if (!prev) return prev;
      const newItem = { type: "", amount: 0, _id: Date.now().toString() };
      return {
        ...prev,
        [type === "allowance" ? "allowances" : "deductions"]: [
          ...prev[type === "allowance" ? "allowances" : "deductions"],
          newItem,
        ],
      };
    });
  };

  // 🔹 Handle Update Item (Allowance / Deduction)
  const updateItem = (type: "allowance" | "deduction", index: number, field: keyof Allowance, value: any) => {
    setPayroll((prev) => {
      if (!prev) return prev;
      const updatedList = [...prev[type === "allowance" ? "allowances" : "deductions"]];
      updatedList[index] = { ...updatedList[index], [field]: value };
      return { ...prev, [type === "allowance" ? "allowances" : "deductions"]: updatedList };
    });
  };

  // 🔹 Handle Delete Item (Allowance / Deduction)
  const deleteItem = (type: "allowance" | "deduction", index: number) => {
    setPayroll((prev) => {
      if (!prev) return prev;
      const updatedList = prev[type === "allowance" ? "allowances" : "deductions"].filter((_, i) => i !== index);
      return { ...prev, [type === "allowance" ? "allowances" : "deductions"]: updatedList };
    });
  };



  // 🔹 Handle Updating Payroll Data
const handleUpdatePayroll = async () => {
    if (!payroll || !userId) return;
  
    setUpdating(true);
  
    // ✅ Extract only the required fields
    const updatedPayroll = {
      basicpay: payroll.basicpay,
      allowances: payroll.allowances.map(({ type, amount }) => ({ type, amount })),
      deductions: payroll.deductions.map(({ type, amount }) => ({ type, amount })),
    };

    console.log(updatedPayroll);
    
  
    try {
      console.log("Updating Payroll Data:", updatedPayroll);
      
      await axios.put(`${backend_link}/payroll/update/${userId}`, updatedPayroll);
      
      alert("Payroll updated successfully!");
    } catch (error) {
      console.error("Error updating payroll:", error);
      alert("Failed to update payroll.");
    } finally {
      setUpdating(false);
    }
  };
  

  if (loading) return <p className="text-gray-400 text-center">Loading payroll data...</p>;
  if (!payroll) return <p className="text-red-400 text-center">No payroll data found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-14 text-gray-200 rounded-lg relative">
      <h2 className="text-xl font-semibold text-gray-300 text-center mb-6">Payroll Details</h2>

      {/* Basic Details */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm mb-2 text-gray-400">Employee Name</label>
          <input
            type="text"
            value={payroll.userId.name}
            disabled
            className="bg-[#363B58] px-3 py-4 rounded-md border border-gray-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2 text-gray-400">Basic Pay (₹)</label>
          <input
            type="number"
            value={payroll.basicpay}
            onChange={(e) => handleInputChange("basicpay", Number(e.target.value))}
            className="bg-[#363B58] px-3 py-4 rounded-md border border-gray-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Allowances & Deductions */}
      <div className="mt-6 flex gap-6">
        {/* Allowances Section */}
        <div className="w-1/2 relative">
          <h3 className="text-lg font-semibold">Allowances</h3>
          {payroll.allowances.map((allowance, index) => (
            <div key={allowance._id} className="flex items-center gap-2 mt-2 border border-dashed border-gray-500">
              <input
                type="text"
                value={allowance.type}
                onChange={(e) => updateItem("allowance", index, "type", e.target.value)}
                className="bg-[#363B58] px-3 py-4 rounded-md border border-gray-600 w-1/2"
              />
              <input
                type="number"
                value={allowance.amount}
                onChange={(e) => updateItem("allowance", index, "amount", Number(e.target.value))}
                className="bg-[#363B58] px-3 py-4 rounded-md border border-gray-600 w-1/3"
              />
              <button onClick={() => deleteItem("allowance", index)} className="text-[#EB6B6B]">
                <FaTrash />
              </button>
            </div>
          ))}
          <button onClick={() => addItem("allowance")} className="mt-3 flex items-center gap-2 text-[#97BA8B]">
            <FaPlus /> Add Allowance
          </button>
        </div>

        {/* Deductions Section */}
        {/* Deductions Section */}
<div className="w-1/2 relative">
  <h3 className="text-lg font-semibold">Deductions</h3>
  {payroll.deductions.map((deduction, index) => (
    <div key={deduction._id} className="flex items-center gap-2 mt-2 border border-dashed border-gray-500">
      <input
        type="text"
        value={deduction.type}
        onChange={(e) => updateItem("deduction", index, "type", e.target.value)}
        className="bg-[#363B58] px-3 py-4 rounded-md border border-gray-600 w-1/2"
      />
      <input
        type="number"
        value={deduction.amount}
        onChange={(e) => updateItem("deduction", index, "amount", Number(e.target.value))}
        className="bg-[#363B58] px-3 py-4 rounded-md border border-gray-600 w-1/3"
      />
      <button onClick={() => deleteItem("deduction", index)} className="text-[#EB6B6B]">
        <FaTrash />
      </button>
    </div>
  ))}
  
  {/* ✅ Added the "Add Deduction" button here */}
  <button onClick={() => addItem("deduction")} className="mt-3 flex items-center gap-2 text-[#97BA8B]">
    <FaPlus /> Add Deduction
  </button>
</div>

      </div>

      <button onClick={handleUpdatePayroll} className="bg-[#897EEF] px-16 py-4 mt-6 rounded-sm capitalize">
        {updating ? "Updating..." : "Update Payroll"}
      </button>
    </div>
  );
};

export default PayrollPage;
